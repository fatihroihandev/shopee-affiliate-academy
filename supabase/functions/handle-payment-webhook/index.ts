// SUPABASE EDGE FUNCTION: handle-payment-webhook
// Follows Supabase Edge Functions runtime (Deno)
// Path: supabase/functions/handle-payment-webhook/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-signature",
};

interface PaymentWebhookPayload {
  order_number: string;
  amount: number;
  status: "paid" | "settlement" | "success" | "captured" | "failed" | "cancelled";
  provider: "lynk" | "dana_qris" | "manual" | "midtrans" | "xendit";
  provider_reference?: string;
  customer_email?: string;
  signature?: string;
  metadata?: Record<string, unknown>;
}

serve(async (req: Request) => {
  // 1. Tangani CORS pre-flight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const webhookSecret = Deno.env.get("PAYMENT_WEBHOOK_SECRET") ?? "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Konfigurasi server backend belum lengkap.");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Validasi Token / Signature jika webhook secret dikonfigurasi
    const incomingSignature = req.headers.get("x-webhook-signature") || req.headers.get("authorization");
    if (webhookSecret && incomingSignature !== webhookSecret && incomingSignature !== `Bearer ${webhookSecret}`) {
      return new Response(
        JSON.stringify({ error: "Invalid webhook secret or signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Parse Payload
    const payload: PaymentWebhookPayload = await req.json();
    const { order_number, status, provider_reference, customer_email } = payload;

    if (!order_number) {
      return new Response(
        JSON.stringify({ error: "Parameter order_number wajib disertakan." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 4. Cari Pesanan Terdaftar
    const { data: order, error: orderFetchErr } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", order_number)
      .maybeSingle();

    if (orderFetchErr || !order) {
      return new Response(
        JSON.stringify({ error: `Pesanan ${order_number} tidak ditemukan.` }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. Cek Idempotency: Jika sudah paid, tidak perlu diproses ulang
    if (order.status === "paid") {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Pesanan ini sudah berstatus paid sebelumnya (Idempotent).",
          order_id: order.id,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isSuccessStatus = ["paid", "settlement", "success", "captured"].includes(status);

    if (isSuccessStatus) {
      // 6. Update Status Order menjadi Paid
      const nowIso = new Date().toISOString();
      await supabase
        .from("orders")
        .update({
          status: "paid",
          paid_at: nowIso,
          provider_reference: provider_reference || order.provider_reference,
          updated_at: nowIso,
        })
        .eq("id", order.id);

      // 7. Berikan atau Upgrade Entitlement Pengguna
      const targetTier = order.tier === "pro_plus" || order.sku === "affiliate_academy_pro_plus" ? "pro_plus" : "pro";
      const targetUserId = order.user_id;

      if (targetUserId) {
        // Upsert entitlement aktif
        await supabase
          .from("entitlements")
          .upsert(
            {
              user_id: targetUserId,
              product_code: "affiliate_academy",
              access_level: targetTier,
              status: "active",
              source_order_id: order.id,
              customer_email: customer_email || order.customer_email,
              granted_at: nowIso,
            },
            { onConflict: "user_id,product_code" }
          );
      }

      // 8. Catat Audit Log
      await supabase.from("admin_audit_logs").insert({
        admin_user_id: targetUserId || "00000000-0000-0000-0000-000000000001",
        action: "PAYMENT_WEBHOOK_VERIFIED",
        target_user_id: targetUserId,
        related_order_id: order.id,
        reason: `Webhook notifikasi pembayaran berhasil dari provider ${order.provider}.`,
        metadata: {
          order_number: order.order_number,
          amount: order.amount,
          provider_reference,
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `Pesanan ${order.order_number} berhasil diselesaikan dan entitlement ${targetTier} diaktifkan.`,
          order_id: order.id,
          access_level: targetTier,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Status pembayaran gagal / dibatalkan
      await supabase
        .from("orders")
        .update({
          status: status === "cancelled" ? "cancelled" : "failed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Status pesanan ${order.order_number} diubah menjadi ${status}.`,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal Server Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
