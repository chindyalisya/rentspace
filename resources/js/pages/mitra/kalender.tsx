// @ts-nocheck
import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { Button, rupiah, Thumb } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import { bookedDates, bySlug, mitraItems, mitraRequests as initReq } from '@/lib/dummy';

const monthName = new Date(2026, 9, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

function MonthGrid({ booked }) {
  const first = new Date(2026, 9, 1);
  const startPad = (first.getDay() + 6) % 7; // mulai Senin
  const total = new Date(2026, 10, 0).getDate();
  const cells = [...Array(startPad).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  const iso = (d) => `2026-10-${String(d).padStart(2, '0')}`;
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium text-ink/45">{['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="mt-1.5 grid grid-cols-7 gap-1.5">
        {cells.map((d, i) => d ? (
          <div key={i} className={`grid aspect-square place-items-center rounded-xl text-xs font-medium ${booked.includes(iso(d)) ? 'bg-rose/30 text-rose-deep' : 'bg-white/60 text-ink/60'}`}>{d}</div>
        ) : <div key={i} />)}
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-ink/55">
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-rose/50" />Sudah dibooking</span>
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-white/60" />Tersedia</span>
      </div>
    </div>
  );
}

export default function MitraKalender() {
  const [slug, setSlug] = useState(mitraItems[0].slug);
  const [reqs, setReqs] = useState(initReq);
  const act = (id, ok) => setReqs((r) => r.filter((x) => x.id !== id)); // TODO: POST terima/tolak ke backend
  const booked = useMemo(() => bookedDates[slug] ?? [], [slug]);

  return (
    <AppShell>
      <Head title="Kalender & permintaan" />
      <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">Kalender & permintaan sewa</h1>
      <MitraTabs active="/mitra/kalender" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="glass rounded-3xl p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-teal-deep">Ketersediaan · {monthName}</p>
            <select value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-xl border border-white/80 bg-white/70 px-3 py-1.5 text-xs outline-none">
              {mitraItems.map((it) => <option key={it.slug} value={it.slug}>{it.name}</option>)}
            </select>
          </div>
          <MonthGrid booked={booked} />
        </section>

        <section className="glass rounded-3xl p-5">
          <p className="mb-3 font-medium text-teal-deep">Permintaan sewa masuk</p>
          <div className="space-y-3">
            {reqs.map((r) => {
              const it = bySlug(r.slug);
              return (
                <div key={r.id} className="rounded-2xl bg-white/60 p-4">
                  <div className="flex items-center gap-3">
                    <Thumb item={it} zoom={false} className="size-11 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{it.name}</p>
                      <p className="text-xs text-ink/55">{r.penyewa} · {r.start} sampai {r.end}</p>
                    </div>
                    <p className="text-sm font-medium text-teal">{rupiah(r.total)}</p>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <Button variant="soft" onClick={() => act(r.id, false)} className="!py-2 gap-1.5"><X size={15} />Tolak</Button>
                    <Button onClick={() => act(r.id, true)} className="!py-2 gap-1.5"><Check size={15} />Terima</Button>
                  </div>
                </div>
              );
            })}
            {!reqs.length && <p className="text-sm text-ink/55">Tidak ada permintaan yang menunggu.</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
