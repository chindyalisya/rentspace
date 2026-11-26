// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button, Logo } from '@/components/rs';
import { Page } from '@/layouts/shell';
import { foto } from '@/lib/dummy';

const slides = [
    {
        img: foto['tenda-dome-4p'],
        chip: 'Tenda, carrier, sleeping bag',
        title: 'Sewa tanpa ribet',
        text: 'Butuh barang untuk event atau tugas kuliah? Sewa aja di RentSpace, hemat dan praktis.',
    },
    {
        img: foto['canon-eos-30d'],
        chip: 'Kamera mulai Rp50.000/hari',
        title: 'Pilih tanggal sesukamu',
        text: 'Cek ketersediaan dan booking dalam hitungan menit. Barang siap saat kamu butuh.',
    },
    {
        img: foto['kemeja-putih-pria'],
        chip: 'Deposit Rp100.000 aman',
        title: 'Aman sampai kembali',
        text: 'Deposit dijamin sistem dan cair otomatis setelah barang dikembalikan dengan utuh.',
    },
];

export default function Onboarding() {
    const [i, setI] = useState(-1); // -1 = splash
    const [leaving, setLeaving] = useState(false);
    const x0 = useRef(0);

   useEffect(() => {
    if (i !== -1) return;
    const t1 = setTimeout(() => setLeaving(true), 1500);
    const t2 = setTimeout(() => setI(0), 1900);
    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
}, [i]);

    const finish = (to) => {
        localStorage.setItem('rs_onboarded', '1');
        router.visit(to);
    };
    const last = i === slides.length - 1;
    const go = (d) =>
        setI((v) => Math.min(slides.length - 1, Math.max(0, v + d)));

    if (i === -1) {
        return (
            <Page
                className={`grid place-items-center transition-opacity duration-500 ${leaving ? 'opacity-0' : 'opacity-100'}`}
            >
                <Head title="RentSpace" />
                <div className="rs-pop flex flex-col items-center gap-5">
                    <Logo className="origin-center scale-150" />
                    <span
                        className="mt-4 block h-0.5 w-24 origin-left rounded-full bg-rose-deep"
                        style={{
                            animation:
                                'rs-grow 1.4s var(--ease-out-expo) both .2s',
                        }}
                    />
                </div>
            </Page>
        );
    }

    const s = slides[i];
    return (
        <Page className="grid place-items-center p-4 sm:p-8">
            <Head title="Selamat datang" />
            <div
                className="glass rs-pop grid w-full max-w-4xl overflow-hidden rounded-3xl lg:grid-cols-2"
                onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                    const dx = e.changedTouches[0].clientX - x0.current;
                    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                }}
            >
                <div className="relative min-h-72 overflow-hidden bg-sand lg:min-h-[30rem]">
                    {slides.map((sl, n) => (
                        <img
                            key={n}
                            src={sl.img}
                            alt=""
                            className={`absolute inset-0 size-full object-cover transition-all duration-[900ms] ease-out ${n === i ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                        />
                    ))}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
                    <span
                        key={i}
                        className="rs-rise absolute bottom-5 left-5 rounded-full bg-surface/92 px-4 py-2 text-xs font-semibold text-teal-ink shadow-md"
                    >
                        {s.chip}
                    </span>
                </div>
                <div className="flex flex-col p-7 sm:p-10">
                    <Logo className="mb-8 hidden lg:inline-flex" />
                    <div key={i} className="rs-rise">
                        <h1 className="text-3xl leading-tight text-teal-ink sm:text-4xl">
                            {s.title}
                        </h1>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
                            {s.text}
                        </p>
                    </div>
                    <div className="my-7 flex gap-1.5" aria-hidden>
                        {slides.map((_, n) => (
                            <span
                                key={n}
                                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${n === i ? 'w-8 bg-rose-deep' : 'w-1.5 bg-teal/25'}`}
                            />
                        ))}
                    </div>
                    <div className="mt-auto flex gap-3">
                        {!last && (
                            <Button
                                variant="soft"
                                onClick={() => finish('/login')}
                                className="w-auto px-6"
                            >
                                Lewati
                            </Button>
                        )}
                        <Button
                            onClick={() => (last ? finish('/register') : go(1))}
                        >
                            {last ? 'Mulai' : 'Lanjut'}
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
