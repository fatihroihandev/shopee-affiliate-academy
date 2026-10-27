import React, { useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import {
  PRO_PLUS_CAMPAIGN_DATA,
  PRO_PLUS_CASE_STUDIES,
  PRO_PLUS_OBJECTION_PLAYBOOK,
} from '@/data/proPlusBonusData';
import { StickerBadge } from '@/components/common/Doodles';
import { CheckoutModal } from '@/features/commerce/CheckoutModal';
import { usePageTitle } from '@/hooks/usePageTitle';
import {
  Sparkles,
  PackageCheck,
  FlaskConical,
  Compass,
  Copy,
  Check,
  Lock,
  ShieldAlert,
  Calendar,
  Target,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
} from 'lucide-react';

export const ProPlusBonusViewer: React.FC = () => {
  usePageTitle('Bonus Pro Plus Eksklusif', 'Paket bonus implementasi eksklusif Pro Plus: Affiliate Campaign-in-a-Box, Case Study Lab, dan Objection Playbook.');
  const { isProPlus, loginAsDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<'campaign' | 'casestudy' | 'playbook'>('campaign');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // If user does not have Pro Plus entitlement
  if (!isProPlus) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        <div className="brutalist-card p-8 sm:p-12 bg-surface text-center space-y-6 border-4 border-ink shadow-[8px_8px_0px_#FF9278]">
          <div className="w-16 h-16 bg-soft-coral border-2 border-ink rounded-full flex items-center justify-center mx-auto shadow-[3px_3px_0px_#171717]">
            <Lock className="w-8 h-8 text-ink" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="flex justify-center gap-2">
              <StickerBadge variant="coral">MODUL EKSKLUSIF PRO PLUS</StickerBadge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-ink">
              Area Implementasi Lanjutan Pro Plus
            </h1>
            <p className="text-sm text-warm-gray leading-relaxed">
              Halaman ini memuat <strong>3 Bonus Eksklusif Implementasi</strong> per Addendum v2.1:
              Affiliate Campaign-in-a-Box, Affiliate Case Study Lab, dan Content Angle & Objection Playbook.
            </p>
          </div>

          {/* Value Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 bg-paper border-2 border-ink rounded space-y-2">
              <div className="flex items-center gap-2 font-black text-xs text-ink uppercase">
                <PackageCheck className="w-4 h-4 text-brand-orange" />
                <span>Campaign-in-a-Box</span>
              </div>
              <p className="text-xs text-warm-gray">
                Paket rencana 14 hari siap adaptasi: profil audiens, pemilihan produk, 5 naskah brief, dan panduan mitigasi view drop.
              </p>
            </div>

            <div className="p-4 bg-paper border-2 border-ink rounded space-y-2">
              <div className="flex items-center gap-2 font-black text-xs text-ink uppercase">
                <FlaskConical className="w-4 h-4 text-brand-orange" />
                <span>Case Study Lab</span>
              </div>
              <p className="text-xs text-warm-gray">
                2 studi kasus data nyata simulasi: optimasi margin volume tinggi & audit pembatalan pesanan COD.
              </p>
            </div>

            <div className="p-4 bg-paper border-2 border-ink rounded space-y-2">
              <div className="flex items-center gap-2 font-black text-xs text-ink uppercase">
                <Compass className="w-4 h-4 text-brand-orange" />
                <span>Objection Playbook</span>
              </div>
              <p className="text-xs text-warm-gray">
                Matriks 5 sudut konten dan formula etis menjawab 5 keraguan terbesar pembeli tanpa klaim berlebihan.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="brutalist-btn bg-brand-orange text-white px-8 py-3.5 text-sm font-extrabold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upgrade ke Paket Pro Plus (Rp199.000)</span>
            </button>
            <button
              onClick={() => loginAsDemo('student', 'pro_plus')}
              className="brutalist-btn bg-acid-lime text-ink px-6 py-3.5 text-xs font-bold w-full sm:w-auto hover:bg-lime-300"
            >
              ⚡ Buka Akses Instan (Mode Demo Pro Plus)
            </button>
          </div>
        </div>

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          initialSku="affiliate_academy_pro_plus"
        />
      </div>
    );
  }

  // Active Pro Plus Access View
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <StickerBadge variant="coral">PRO PLUS SUITE</StickerBadge>
          <span className="text-xs font-bold bg-surface border border-ink px-2.5 py-1 rounded">
            Implementasi Bebas Ketergantungan API AI
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-ink flex items-center gap-2">
              Paket Implementasi Pro Plus
              <Sparkles className="w-6 h-6 text-brand-orange" />
            </h1>
            <p className="text-sm text-warm-gray mt-1">
              Rencana aksi siap adaptasi, studi kasus analisis bukti, dan playbook penanganan keraguan pembeli.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b-2 border-ink gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('campaign')}
          className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs sm:text-sm border-2 border-b-0 rounded-t-lg transition-all ${
            activeTab === 'campaign'
              ? 'bg-paper text-ink border-ink shadow-[2px_-2px_0px_#171717]'
              : 'bg-surface text-warm-gray border-transparent hover:text-ink'
          }`}
        >
          <PackageCheck className="w-4 h-4 text-brand-orange" />
          <span>1. Campaign-in-a-Box</span>
        </button>

        <button
          onClick={() => setActiveTab('casestudy')}
          className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs sm:text-sm border-2 border-b-0 rounded-t-lg transition-all ${
            activeTab === 'casestudy'
              ? 'bg-paper text-ink border-ink shadow-[2px_-2px_0px_#171717]'
              : 'bg-surface text-warm-gray border-transparent hover:text-ink'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-brand-orange" />
          <span>2. Case Study Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('playbook')}
          className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs sm:text-sm border-2 border-b-0 rounded-t-lg transition-all ${
            activeTab === 'playbook'
              ? 'bg-paper text-ink border-ink shadow-[2px_-2px_0px_#171717]'
              : 'bg-surface text-warm-gray border-transparent hover:text-ink'
          }`}
        >
          <Compass className="w-4 h-4 text-brand-orange" />
          <span>3. Objection Playbook</span>
        </button>
      </div>

      {/* TAB 1: CAMPAIGN-IN-A-BOX */}
      {activeTab === 'campaign' && (
        <div className="space-y-8">
          {/* Campaign Overview Card */}
          <div className="brutalist-card p-6 sm:p-8 bg-paper space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-ink pb-4">
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase">Kampanye Terverifikasi</span>
                <h2 className="text-xl sm:text-2xl font-black text-ink">{PRO_PLUS_CAMPAIGN_DATA.title}</h2>
                <div className="text-xs text-warm-gray font-medium mt-0.5">
                  Niche: <strong className="text-ink">{PRO_PLUS_CAMPAIGN_DATA.niche}</strong>
                </div>
              </div>
              <span className="text-xs font-extrabold bg-acid-lime text-ink px-3 py-1.5 rounded border border-ink self-start sm:self-auto">
                14 HARI SIKLUS
              </span>
            </div>

            {/* Target Audience Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-surface border-2 border-ink rounded space-y-1">
                <div className="text-xs font-extrabold text-ink uppercase flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-brand-orange" />
                  <span>Profil Target Audiens:</span>
                </div>
                <div className="text-xs text-ink font-semibold">{PRO_PLUS_CAMPAIGN_DATA.targetAudience.persona}</div>
                <div className="text-[11px] text-warm-gray">{PRO_PLUS_CAMPAIGN_DATA.targetAudience.demographics}</div>
              </div>

              <div className="p-4 bg-surface border-2 border-ink rounded space-y-1">
                <div className="text-xs font-extrabold text-ink uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-brand-orange" />
                  <span>Titik Sakit & Trigger Pembelian:</span>
                </div>
                <div className="text-xs text-ink">{PRO_PLUS_CAMPAIGN_DATA.targetAudience.coreProblem}</div>
                <div className="text-[11px] text-brand-orange font-medium mt-1">
                  Trigger: {PRO_PLUS_CAMPAIGN_DATA.targetAudience.buyingTrigger}
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="p-4 bg-surface border-2 border-ink rounded space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-ink uppercase flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-brand-orange" />
                  <span>Kriteria & Pemilihan Produk:</span>
                </span>
                <span className="text-xs font-bold text-warm-gray">
                  Rentang Ideal: {PRO_PLUS_CAMPAIGN_DATA.productSelection.idealPriceRange}
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-warm-gray">
                {PRO_PLUS_CAMPAIGN_DATA.productSelection.selectionCriteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-brand-orange font-bold">•</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-ink/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRO_PLUS_CAMPAIGN_DATA.productSelection.sampleProducts.map((p, idx) => (
                  <div key={idx} className="p-3 bg-paper border border-ink rounded text-xs space-y-1">
                    <div className="font-bold text-ink">{p.name}</div>
                    <div className="flex justify-between text-warm-gray">
                      <span>Harga: <strong>{p.price}</strong></span>
                      <span className="text-brand-orange font-bold">{p.estCommissionRate}</span>
                    </div>
                    <p className="text-[11px] text-warm-gray italic">{p.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Content Briefs & Scripts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-ink flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-orange" />
                <span>5 Brief Naskah Konten Siap Adaptasi</span>
              </h3>
              <span className="text-xs text-warm-gray">Urutan strategis 14 hari</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {PRO_PLUS_CAMPAIGN_DATA.contentBriefs.map((brief, idx) => (
                <div key={idx} className="brutalist-card p-5 bg-surface space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-ink text-paper rounded-full flex items-center justify-center font-bold text-xs">
                        H{brief.day}
                      </span>
                      <span className="text-xs font-bold uppercase bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded border border-brand-orange">
                        {brief.angleType}
                      </span>
                      <h4 className="font-extrabold text-sm text-ink">{brief.headline}</h4>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyText(
                          `NASKAH KONTEN HARI ${brief.day} (${brief.angleType})\nJudul: ${brief.headline}\nHook: ${brief.hookScript}\nPesan Utama: ${brief.coreMessage}\nCTA: ${brief.callToAction}`,
                          `script-${idx}`
                        )
                      }
                      className="text-xs font-bold px-3 py-1 bg-paper border border-ink rounded flex items-center gap-1 hover:bg-surface self-end sm:self-auto"
                    >
                      {copiedId === `script-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Naskah</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-paper border border-ink/40 rounded">
                      <span className="font-bold text-ink uppercase text-[10px] block mb-0.5">
                        Hook Pembuka (3 Detik Pertama):
                      </span>
                      <p className="italic text-ink font-medium">{brief.hookScript}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-2.5 bg-paper border border-ink/40 rounded">
                        <span className="font-bold text-ink uppercase text-[10px] block mb-0.5">
                          Inti Demonstrasi / Pesan:
                        </span>
                        <p className="text-warm-gray">{brief.coreMessage}</p>
                      </div>
                      <div className="p-2.5 bg-paper border border-ink/40 rounded">
                        <span className="font-bold text-brand-orange uppercase text-[10px] block mb-0.5">
                          Call To Action (CTA):
                        </span>
                        <p className="text-ink font-semibold">{brief.callToAction}</p>
                        <span className="text-[10px] text-warm-gray block mt-1">
                          Target Metrik: <strong>{brief.targetMetric}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Schedule & Decision Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Publishing Schedule */}
            <div className="brutalist-card p-6 bg-paper space-y-4">
              <h3 className="font-black text-base text-ink flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-orange" />
                <span>Rencana Publikasi 3 Fase</span>
              </h3>
              <div className="space-y-3">
                {PRO_PLUS_CAMPAIGN_DATA.publishingSchedule.map((phase, idx) => (
                  <div key={idx} className="p-3 bg-surface border border-ink rounded space-y-1.5 text-xs">
                    <div className="font-bold text-ink">{phase.phase}</div>
                    <div className="text-[11px] text-brand-orange font-semibold">{phase.timeline}</div>
                    <p className="text-warm-gray">{phase.focus}</p>
                    <ul className="list-disc list-inside text-[11px] text-ink/80 space-y-0.5 pt-1 border-t border-ink/10">
                      {phase.actionItems.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Guide & Mitigasi */}
            <div className="brutalist-card p-6 bg-paper space-y-4">
              <h3 className="font-black text-base text-ink flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-brand-orange" />
                <span>Panduan Keputusan & Mitigasi Kendala</span>
              </h3>
              <div className="space-y-3">
                {PRO_PLUS_CAMPAIGN_DATA.decisionGuide.map((guide, idx) => (
                  <div key={idx} className="p-3 bg-surface border border-ink rounded space-y-1.5 text-xs">
                    <div className="font-bold text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{guide.condition}</span>
                    </div>
                    <div className="text-warm-gray">
                      <strong>Diagnosa:</strong> {guide.diagnosis}
                    </div>
                    <div className="text-ink font-semibold bg-acid-lime/30 p-2 rounded border border-ink/20">
                      <strong>Aksi Korektif:</strong> {guide.correctiveAction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist Peluncuran */}
          <div className="p-6 bg-surface border-2 border-ink rounded-lg shadow-[4px_4px_0px_#171717] space-y-3">
            <h4 className="font-black text-sm uppercase text-ink flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-green-600" />
              <span>Checklist Quality Control Sebelum Tayang</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PRO_PLUS_CAMPAIGN_DATA.launchChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-paper border border-ink rounded">
                  <Check className="w-4 h-4 text-brand-orange shrink-0" />
                  <span className="text-ink font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CASE STUDY LAB */}
      {activeTab === 'casestudy' && (
        <div className="space-y-6">
          {/* Case Study Switcher */}
          <div className="flex gap-3">
            {PRO_PLUS_CASE_STUDIES.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseIndex(idx)}
                className={`flex-1 p-4 border-2 text-left rounded transition-all ${
                  selectedCaseIndex === idx
                    ? 'border-brand-orange bg-brand-orange/10 shadow-[3px_3px_0px_#FF7A24]'
                    : 'border-ink bg-surface hover:bg-paper'
                }`}
              >
                <div className="text-[10px] font-bold uppercase text-brand-orange">
                  Kasus 0{idx + 1}
                </div>
                <div className="font-black text-xs sm:text-sm text-ink line-clamp-1">{cs.title}</div>
                <div className="text-[11px] text-warm-gray mt-0.5">{cs.niche}</div>
              </button>
            ))}
          </div>

          {/* Active Case Study Detail */}
          {(() => {
            const cs = PRO_PLUS_CASE_STUDIES[selectedCaseIndex];
            return (
              <div className="space-y-6">
                <div className="brutalist-card p-6 sm:p-8 bg-paper space-y-4">
                  <div className="space-y-1 border-b-2 border-ink pb-4">
                    <span className="text-xs font-bold text-brand-orange uppercase">{cs.period}</span>
                    <h2 className="text-xl sm:text-2xl font-black text-ink">{cs.title}</h2>
                    <p className="text-xs text-warm-gray italic pt-1">
                      <strong>Hipotesis Awal:</strong> &ldquo;{cs.hypothesis}&rdquo;
                    </p>
                  </div>

                  {/* 8 Simulation Metrics Grid */}
                  <div className="space-y-2">
                    <div className="text-xs font-extrabold uppercase text-ink flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-brand-orange" />
                      <span>Data Simulasi Terinci & Metrik Turunan:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Impresi</div>
                        <div className="text-base font-black text-ink">{cs.simulationMetrics.impressions.toLocaleString()}</div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Klik Link (CTR)</div>
                        <div className="text-base font-black text-ink">
                          {cs.simulationMetrics.clicks.toLocaleString()} ({cs.simulationMetrics.ctr})
                        </div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Pesanan (CVR)</div>
                        <div className="text-base font-black text-brand-orange">
                          {cs.simulationMetrics.orders} ({cs.simulationMetrics.cvr})
                        </div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Total GMV</div>
                        <div className="text-base font-black text-ink">
                          Rp{cs.simulationMetrics.gmv.toLocaleString('id-ID')}
                        </div>
                      </div>

                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Estimasi Komisi</div>
                        <div className="text-base font-black text-ink">
                          Rp{cs.simulationMetrics.estimatedCommission.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-red-500 font-bold">Pembatalan ({cs.simulationMetrics.cancellationRate})</div>
                        <div className="text-base font-black text-red-600">
                          -{cs.simulationMetrics.cancelledOrders} (Rp{cs.simulationMetrics.cancellationLoss.toLocaleString('id-ID')})
                        </div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">Komisi Valid (Bersih)</div>
                        <div className="text-base font-black text-green-700">
                          Rp{cs.simulationMetrics.validCommission.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="p-3 bg-surface border border-ink rounded">
                        <div className="text-[10px] text-warm-gray font-bold">EPC Bersih</div>
                        <div className="text-base font-black text-ink font-mono">{cs.simulationMetrics.epc}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chronological Steps */}
                <div className="brutalist-card p-6 bg-surface space-y-4">
                  <h3 className="font-black text-base text-ink">Rekonstruksi Langkah & Alasan Keputusan</h3>
                  <div className="space-y-3">
                    {cs.chronologicalSteps.map((step, idx) => (
                      <div key={idx} className="p-3 bg-paper border border-ink rounded text-xs space-y-1">
                        <div className="font-bold text-brand-orange">{step.stage}</div>
                        <div className="text-ink font-medium">{step.actionTaken}</div>
                        <p className="text-[11px] text-warm-gray italic">
                          <strong>Alasan:</strong> {step.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Factors, Mistakes, and Takeaways */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-paper border-2 border-ink rounded space-y-3">
                    <h4 className="font-black text-xs uppercase text-ink flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-green-600" />
                      <span>Faktor Kunci Keberhasilan:</span>
                    </h4>
                    <ul className="text-xs text-warm-gray space-y-2 list-disc list-inside">
                      {cs.successFactors.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-paper border-2 border-ink rounded space-y-3">
                    <h4 className="font-black text-xs uppercase text-ink flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span>Kesalahan yang Terjadi & Koreksi:</span>
                    </h4>
                    {cs.mistakesAndCorrections.map((m, idx) => (
                      <div key={idx} className="text-xs space-y-1">
                        <div className="text-red-700 font-bold">{m.mistake}</div>
                        <div className="text-[11px] text-warm-gray">Dampak: {m.impact}</div>
                        <div className="text-[11px] text-green-700 font-semibold bg-green-50 p-1.5 rounded border border-green-200">
                          Solusi: {m.solution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Takeaways */}
                <div className="p-5 bg-acid-lime/20 border-2 border-ink rounded-lg space-y-2">
                  <div className="font-black text-xs uppercase text-ink flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-brand-orange" />
                    <span>Pelajaran Penting yang Dapat Diterapkan:</span>
                  </div>
                  <ul className="text-xs text-ink space-y-1 list-disc list-inside font-medium">
                    {cs.keyTakeaways.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Official Disclaimer */}
                <div className="p-4 bg-surface border border-ink/40 rounded text-[11px] text-warm-gray flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-warm-gray shrink-0 mt-0.5" />
                  <span>{cs.disclaimer}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: OBJECTION PLAYBOOK */}
      {activeTab === 'playbook' && (
        <div className="space-y-8">
          {/* Angle Matrix */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-ink flex items-center gap-2">
                <Compass className="w-5 h-5 text-brand-orange" />
                <span>Matriks 5 Sudut Pandang Konten Shopee</span>
              </h3>
              <p className="text-xs text-warm-gray">
                Pilih tujuan konten yang jelas sebelum memproduksi video agar pesan terfokus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRO_PLUS_OBJECTION_PLAYBOOK.angleMatrix.map((matrix, idx) => (
                <div key={idx} className="brutalist-card p-5 bg-surface space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="font-extrabold text-sm text-ink">{matrix.goal}</h4>
                    <span className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded">
                      Fokus #{idx + 1}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-warm-gray uppercase">Masalah Sasaran:</span>
                      <p className="text-ink">{matrix.buyerPainPoint}</p>
                    </div>
                    <div className="p-2 bg-paper border border-ink/40 rounded">
                      <span className="text-[10px] font-bold text-brand-orange uppercase">Pola Hook:</span>
                      <p className="italic font-medium text-ink">{matrix.hookPattern}</p>
                    </div>
                    <div className="text-[11px] text-warm-gray">
                      <strong>Struktur:</strong> {matrix.structure}
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-ink/10 text-[11px]">
                      <span className="text-warm-gray font-medium">Metrik Utama: <strong>{matrix.primaryMetric}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objection Handlers */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black text-ink flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-orange" />
                <span>Kerangka Penanganan 5 Keraguan Terbesar Pembeli</span>
              </h3>
              <p className="text-xs text-warm-gray">
                Cara etis menjawab ketakutan calon pembeli tanpa membuat janji atau klaim berlebihan.
              </p>
            </div>

            <div className="space-y-4">
              {PRO_PLUS_OBJECTION_PLAYBOOK.objectionHandlers.map((obj, idx) => (
                <div key={idx} className="brutalist-card p-6 bg-paper space-y-3">
                  <div className="border-b-2 border-ink pb-2">
                    <h4 className="font-black text-base text-ink">{obj.objectionType}</h4>
                    <p className="text-xs text-warm-gray italic mt-0.5">
                      Monolog batin pembeli: &ldquo;{obj.buyerInternalMonologue}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-surface border border-ink rounded space-y-1">
                      <span className="font-bold text-brand-orange uppercase text-[10px]">
                        Bukti yang Wajib Ditampilkan:
                      </span>
                      <p className="text-ink">{obj.proofElementNeeded}</p>
                    </div>

                    <div className="p-3 bg-surface border border-ink rounded space-y-1">
                      <span className="font-bold text-ink uppercase text-[10px]">
                        Formula Jawaban Etis:
                      </span>
                      <p className="text-warm-gray">{obj.ethicalResponseFormula}</p>
                    </div>
                  </div>

                  {/* Sample Phrases & Forbidden Claims */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-green-50 border border-green-300 rounded space-y-1">
                      <span className="font-bold text-green-800 uppercase text-[10px] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Contoh Frasa yang Disarankan:
                      </span>
                      <ul className="space-y-1 text-[11px] text-green-950">
                        {obj.samplePhrases.map((phrase, pIdx) => (
                          <li key={pIdx}>&bull; {phrase}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-red-50 border border-red-300 rounded space-y-1">
                      <span className="font-bold text-red-800 uppercase text-[10px] flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Larangan Tegas:
                      </span>
                      <ul className="space-y-1 text-[11px] text-red-950 font-medium">
                        {obj.forbiddenClaims.map((claim, cIdx) => (
                          <li key={cIdx}>&bull; {claim}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-Publish Checklist */}
          <div className="p-6 bg-surface border-2 border-ink rounded-lg shadow-[4px_4px_0px_#171717] space-y-3">
            <h4 className="font-black text-sm uppercase text-ink flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-brand-orange" />
              <span>Checklist 5 Poin Sebelum Unggah Konten</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PRO_PLUS_OBJECTION_PLAYBOOK.prePublishChecklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-paper border border-ink rounded">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-ink font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
