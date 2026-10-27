// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button, Logo } from '@/components/rs';
import { Page } from '@/layouts/shell';

/* Opsional: taruh ilustrasi di public/img/onboarding-1.png, -2.png, -3.png */
const slides = [
  { emoji: '🏕️', chip: 'Kamera, tenda, almamater', title: 'Sewa tanpa ribet', text: 'Butuh barang untuk event atau tugas kuliah? Sewa aja di RentSpace, hemat dan praktis.' },
  { emoji: '📅', chip: '12 sampai 15 Sep tersedia', title: 'Pilih tanggal sesukamu', text: 'Cek ketersediaan real-time dan booking dalam hitungan menit. Barang siap saat kamu butuh.' },
  { emoji: '🛡️', chip: 'Deposit Rp100.000 aman', title: 'Aman sampai kembali', text: 'Deposit dijamin sistem dan cair otomatis setelah barang dikembalikan dengan utuh.' },
];

export default function Onboarding() {
  const [i, setI] = useState(-1); // -1 = splash
  const x0 = useRef(0);

  useEffect(() => {
    if (i !== -1) return;
    const t = setTimeout(() => {
      if (localStorage.getItem('rs_onboarded')) router.visit('/login', { replace: true });
      else setI(0);
    }, 1800);
    return () => clearTimeout(t);
  }, [i]);

  const finish = (to) => { localStorage.setItem('rs_onboarded', '1'); router.visit(to); };
  const last = i === slides.length - 1;
  const go = (d) => setI((v) => Math.min(slides.length - 1, Math.max(0, v + d)));

  if (i === -1) {
    return (
      <Page className="grid place-items-center">
        <Head title="RentSpace" />
        <Logo className="origin-center scale-150" />
      </Page>
    );
  }

  const s = slides[i];
  return (
    <Page className="grid place-items-center p-4 sm:p-8">
      <Head title="Selamat datang" />
      <div
        className="glass grid w-full max-w-4xl overflow-hidden rounded-[2rem] lg:grid-cols-2"
        onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - x0.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); }}
      >
        <div className="relative grid min-h-64 place-items-center bg-gradient-to-br from-rose-soft via-rose/50 to-teal/20 lg:min-h-[28rem]">
          <span className="text-8xl drop-shadow-lg sm:text-9xl">{s.emoji}</span>
          <img src={`/img/onboarding-${i + 1}.png`} alt="" onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 size-full object-contain p-6" />
          <span className="glass absolute bottom-5 left-5 rounded-2xl px-4 py-2 text-xs font-semibold text-teal-deep">{s.chip}</span>
        </div>
        <div className="flex flex-col p-7 sm:p-10">
          <Logo className="mb-8 hidden lg:inline-flex" />
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-teal-deep sm:text-4xl">{s.title}</h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">{s.text}</p>
          <div className="my-7 flex gap-1.5" aria-hidden>
            {slides.map((_, n) => <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-8 bg-teal' : 'w-1.5 bg-teal/25'}`} />)}
          </div>
          <div className="mt-auto flex gap-3">
            {!last && <Button variant="soft" onClick={() => finish('/login')} className="w-auto px-6">Lewati</Button>}
            <Button onClick={() => (last ? finish('/register') : go(1))}>{last ? 'Mulai' : 'Lanjut'}</Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
