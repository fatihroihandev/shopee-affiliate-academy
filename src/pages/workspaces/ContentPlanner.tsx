import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getStoredContentItems,
  getStoredProducts
} from '@/features/workspaces/workspaceStorage';
import { Sparkle, StickerBadge } from '@/components/common/Doodles';
import { Calendar, CheckCircle2, Plus, Video, ArrowRight } from 'lucide-react';

export const ContentPlanner: React.FC = () => {
  const contentItems = getStoredContentItems();
  const products = getStoredProducts();
  const [activeSprintTab, setActiveSprintTab] = useState<'sprint' | 'full'>('sprint');

  // Days 1 - 14 (Sprint Awal)
  const sprintDays = [
    { day: 'Hari 1–3', focus: 'Audiens & Channel', task: 'Tentukan 1 niche & channel utama', isDone: true },
    { day: 'Hari 4–7', focus: 'Riset Produk & Celah', task: 'Saring 3–5 produk di Product Lab', isDone: true },
    { day: 'Hari 8–10', focus: 'Naskah & Hook', task: 'Tulis 10 naskah pertama via Hook Bank', isDone: true },
    { day: 'Hari 11–14', focus: 'Produksi & Publikasi', task: 'Terbitkan minimal 7 video pertama', isDone: false },
    { day: 'Hari 15–21', focus: 'Pengujian Respon', task: 'Analisis metrik tayangan dan CTR', isDone: false },
    { day: 'Hari 22–27', focus: 'Optimasi CRO & Funnel', task: 'Perbaiki CTA & uji coba variasi hook', isDone: false },
    { day: 'Hari 28–30', focus: 'Evaluasi & Scaling', task: 'Rekonsiliasi komisi & susun SOP', isDone: false },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER */}
      <div className="brutalist-card p-6 sm:p-8 bg-surface space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <StickerBadge variant="orange">WORKSPACE 04</StickerBadge>
              <span className="text-xs font-bold text-warm-gray">Kalender 30 Hari</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2">
              Content Planner & Sprint Publikasi
              <Sparkle className="w-5 h-5 text-brand-orange" />
            </h1>
            <p className="text-xs sm:text-sm text-warm-gray font-medium max-w-2xl leading-relaxed">
              Jadwalkan rencana tayang konten Anda. Pantau tahapan produksi dari Ide, Naskah, Pemeriksaan QC, hingga Terbit dan Evaluasi.
            </p>
          </div>

          <Link
            to="/tools/content"
            className="brutalist-btn bg-brand-orange text-white px-5 py-2.5 text-xs font-extrabold gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Konten Baru</span>
          </Link>
        </div>
      </div>

      {/* 2. SPRINT 14 HARI ROADMAP */}
      <div className="brutalist-card p-6 bg-surface space-y-4">
        <div className="flex items-center justify-between border-b-2 border-ink pb-3">
          <span className="font-extrabold text-sm uppercase text-ink flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-orange" />
            Template Sistem Konten 30 Hari (Modul 13)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSprintTab('sprint')}
              className={`px-2.5 py-1 text-xs font-bold border rounded ${
                activeSprintTab === 'sprint' ? 'bg-ink text-white border-ink' : 'bg-paper text-ink'
              }`}
            >
              Sprint 14 Hari
            </button>
            <button
              onClick={() => setActiveSprintTab('full')}
              className={`px-2.5 py-1 text-xs font-bold border rounded ${
                activeSprintTab === 'full' ? 'bg-ink text-white border-ink' : 'bg-paper text-ink'
              }`}
            >
              Full 30 Hari
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {sprintDays
            .slice(0, activeSprintTab === 'sprint' ? 4 : 7)
            .map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 border-ink space-y-2 ${
                  item.isDone ? 'bg-acid-lime/20' : 'bg-paper'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-extrabold">
                  <span className="bg-surface px-2 py-0.5 rounded border border-ink text-ink">
                    {item.day}
                  </span>
                  {item.isDone ? (
                    <span className="text-acid-lime font-bold flex items-center gap-1 text-[11px] bg-ink px-1.5 py-0.2 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Selesai
                    </span>
                  ) : (
                    <span className="text-warm-gray text-[11px] font-semibold">Berjalan</span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-ink">{item.focus}</h4>
                <p className="text-xs text-warm-gray font-medium leading-relaxed">{item.task}</p>
              </div>
            ))}
        </div>
      </div>

      {/* 3. SCHEDULED CONTENT QUEUE */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-ink flex items-center gap-2">
          <Video className="w-4 h-4 text-brand-orange" />
          Antrean Jadwal Publikasi ({contentItems.length} Konten)
        </h3>

        <div className="space-y-3">
          {contentItems.map((item) => {
            const product = products.find((p) => p.id === item.product_id);

            return (
              <div
                key={item.id}
                className="brutalist-card p-4 sm:p-5 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink bg-paper">
                      {item.platform}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-ink bg-acid-lime text-ink">
                      {item.status.toUpperCase()}
                    </span>
                    {product && (
                      <span className="text-xs font-bold text-brand-orange">
                        • {product.name}
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-base text-ink">{item.title}</h4>

                  {item.hook && (
                    <p className="text-xs text-warm-gray italic line-clamp-1 font-medium">
                      "{item.hook}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/tools/content"
                    className="brutalist-btn bg-surface hover:bg-paper text-ink px-3.5 py-1.5 text-xs font-bold gap-1.5"
                  >
                    <span>Buka Skrip</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
