// @ts-nocheck
import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, MapPin, Search, ShieldCheck } from 'lucide-react';
import { ProductCard, Reveal, Thumb, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { bySlug, pick } from '@/lib/dummy';

const categories = [
    [
        'alat-camping',
        'Alat camping',
        'Tenda, carrier, sepatu gunung',
        bySlug('tenda-dome-4p'),
        'foto',
    ],
    [
        'elektronik',
        'Elektronik',
        'Kamera, speaker, stop kontak',
        bySlug('canon-eos-30d'),
        'bg-clay text-white',
    ],
    [
        'fashion',
        'Fashion',
        'Kemeja, rok, sepatu formal',
        bySlug('kemeja-putih-pria'),
        'bg-rose-soft text-teal-deep',
    ],
    [
        'akademik',
        'Akademik',
        'Almamater, kalkulator',
        bySlug('kalkulator-scientific'),
        'bg-teal-deep text-cream',
    ],
];
const jaminan = [
    [
        BadgeCheck,
        'Pengguna terverifikasi',
        'KTM atau KTP dicek sebelum bisa menyewa.',
    ],
    [ShieldCheck, 'Deposit dijamin', 'Dikembalikan setelah barang pulang.'],
    [MapPin, 'Ambil di titik kampus', 'Atau minta diantar ke lokasimu.'],
];
const steps = [
    [
        '01',
        'Pilih barang',
        'Cari yang kamu butuhkan dari sesama mahasiswa di sekitar kampus.',
    ],
    [
        '02',
        'Tentukan tanggal',
        'Pilih tanggal mulai dan selesai, total biaya langsung terlihat.',
    ],
    [
        '03',
        'Ambil dan kembalikan',
        'Ambil di titik kampus atau minta diantar. Deposit kembali setelah barang pulang.',
    ],
];

const Head2 = ({ title, sub, href = '/katalog' }) => (
    <div className="mb-6 flex items-end justify-between gap-4">
        <div>
            <h2 className="text-2xl text-teal-deep sm:text-3xl">{title}</h2>
            {sub && <p className="mt-1 text-sm text-ink/55">{sub}</p>}
        </div>
        <Link
            href={href}
            className="shrink-0 text-sm font-semibold text-teal underline-offset-4 transition hover:text-teal-deep hover:underline"
        >
            Lihat semua
        </Link>
    </div>
);
const Grid = ({ items }) => (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {items.map((it, n) => (
            <Reveal key={it.slug} delay={n * 70}>
                <ProductCard item={it} animate={false} />
            </Reveal>
        ))}
    </div>
);

/* Data dummy: nanti ganti props dari controller, Inertia::render('home', [...]) */
const dummy = pick(
    'canon-eos-30d',
    'almamater-unnes',
    'kemeja-putih-wanita',
    'sneakers-putih',
);
const dummyBest = pick(
    'tenda-dome-4p',
    'carrier-eiger-45l',
    'speaker-jbl',
    'sepatu-gunung',
);

export default function Home({
    featured = dummy,
    best = dummyBest,
    cartCount = 0,
}) {
    const cam = bySlug('canon-eos-30d');
    return (
        <AppShell cartCount={cartCount}>
            <Head title="Beranda" />

            <section className="grid items-center gap-10 py-2 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-6">
                <div>
                    <p className="rs-rise mb-4 text-xs font-semibold tracking-[.18em] text-clay uppercase">
                        Sewa antar mahasiswa
                    </p>
                    <h1
                        className="rs-rise text-4xl leading-[1.08] text-teal-deep sm:text-5xl lg:text-[3.4rem]"
                        style={{ '--d': '60ms' }}
                    >
                        Butuh barang untuk kuliah? Sewa saja, bayar per hari.
                    </h1>
                    <p
                        className="rs-rise mt-5 max-w-lg leading-relaxed text-ink/65"
                        style={{ '--d': '140ms' }}
                    >
                        Kamera, almamater, sampai alat camping dari sesama
                        mahasiswa. Deposit aman sampai barang kembali.
                    </p>
                    <Link
                        href="/cari"
                        className="rs-rise mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-ink/10 bg-white p-2 pl-5 text-sm text-ink/50 shadow-sm transition duration-300 hover:border-teal/40 hover:shadow-md"
                        style={{ '--d': '220ms' }}
                    >
                        <Search size={18} />
                        <span className="flex-1">
                            Cari kamera, tenda, almamater
                        </span>
                        <span className="rounded-xl bg-teal-deep px-5 py-2.5 font-semibold text-cream">
                            Cari
                        </span>
                    </Link>
                    <dl
                        className="rs-rise mt-8 flex gap-8 text-sm"
                        style={{ '--d': '300ms' }}
                    >
                        {[
                            ['17+', 'barang tersedia'],
                            ['Rp5rb', 'mulai per hari'],
                            ['100%', 'deposit dijamin'],
                        ].map(([a, b]) => (
                            <div key={b}>
                                <dt className="font-display text-2xl font-semibold text-teal-deep">
                                    {a}
                                </dt>
                                <dd className="text-xs text-ink/55">{b}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div
                    className="rs-pop relative mx-auto grid aspect-[1/1.05] w-full max-w-lg grid-cols-6 grid-rows-6 gap-3 sm:gap-4"
                    style={{ '--d': '120ms' }}
                >
                    <Thumb
                        item={bySlug('tenda-dome-4p')}
                        eager
                        className="col-span-4 row-span-4 row-start-1 rounded-3xl shadow-lg"
                    />
                    <Thumb
                        item={cam}
                        eager
                        className="col-span-2 col-start-5 row-span-3 row-start-1 rounded-3xl shadow-lg"
                    />
                    <Thumb
                        item={bySlug('speaker-jbl')}
                        eager
                        className="col-span-2 col-start-5 row-span-3 row-start-4 rounded-3xl shadow-lg"
                    />
                    <Thumb
                        item={bySlug('carrier-eiger-45l')}
                        eager
                        className="col-span-4 row-span-2 row-start-5 rounded-3xl shadow-lg"
                    />
                    <div className="rs-float glass absolute right-4 -bottom-4 left-4 flex items-center gap-3 rounded-2xl p-3 sm:right-[-0.5rem] sm:left-auto sm:w-72 sm:p-3.5">
                        <Thumb
                            item={cam}
                            zoom={false}
                            className="size-12 rounded-xl"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                                {cam.name}
                            </p>
                            <p className="text-xs text-ink/55">
                                3 hari, deposit {rupiah(cam.deposit)}
                            </p>
                        </div>
                        <p className="text-sm font-bold text-teal-deep">
                            {rupiah(cam.price * 3)}
                        </p>
                    </div>
                </div>
            </section>

            <Reveal
                as="section"
                className="mt-14 grid gap-4 rounded-3xl bg-clay-soft p-5 sm:grid-cols-3 sm:p-6"
            >
                {jaminan.map(([Icon, t, d]) => (
                    <div key={t} className="flex items-start gap-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-clay text-white">
                            <Icon size={18} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-teal-deep">
                                {t}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-ink/65">
                                {d}
                            </p>
                        </div>
                    </div>
                ))}
            </Reveal>

            <section className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
                {categories.map(([slug, label, sub, it, tone], n) => (
                    <Reveal
                        key={slug}
                        delay={n * 80}
                        className={n === 0 ? 'col-span-2 lg:row-span-2' : ''}
                    >
                        <Link
                            href={`/katalog/${slug}`}
                            className={`group rs-card relative block h-full overflow-hidden rounded-2xl ${tone === 'foto' ? '' : tone}`}
                        >
                            {tone === 'foto' ? (
                                <>
                                    <Thumb
                                        item={it}
                                        className="h-full min-h-72 w-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#14262c]/75 via-transparent to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                        <p className="font-display text-2xl font-semibold">
                                            {label}
                                        </p>
                                        <p className="mt-0.5 text-sm text-white/80">
                                            {sub}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative z-10 flex h-full min-h-44 flex-col justify-between p-4">
                                        <div>
                                            <p className="font-display text-xl font-semibold">
                                                {label}
                                            </p>
                                            <p className="mt-0.5 max-w-[60%] text-xs opacity-85">
                                                {sub}
                                            </p>
                                        </div>
                                        <span className="text-xs font-semibold underline-offset-4 group-hover:underline">
                                            Lihat semua
                                        </span>
                                    </div>
                                    <div className="absolute -right-3 -bottom-3 size-24 rotate-6 overflow-hidden rounded-2xl shadow-lg transition duration-500 group-hover:rotate-3 group-hover:scale-105 sm:size-28">
                                        <Thumb
                                            item={it}
                                            zoom={false}
                                            className="size-full"
                                        />
                                    </div>
                                </>
                            )}
                        </Link>
                    </Reveal>
                ))}
            </section>

            <section className="mt-20">
                <Reveal>
                    <Head2
                        title="Produk pilihan"
                        sub="Paling sering dicari minggu ini"
                    />
                </Reveal>
                <Grid items={featured} />
            </section>

            <section className="mt-20 grid gap-8 rounded-3xl bg-clay p-6 text-cream sm:p-10 lg:grid-cols-3">
                <Reveal className="lg:col-span-3">
                    <h2 className="text-2xl text-white sm:text-3xl">
                        Cara kerjanya
                    </h2>
                </Reveal>
                {steps.map(([n, t, d], k) => (
                    <Reveal key={n} delay={k * 100}>
                        <p className="font-display text-4xl font-semibold text-rose">
                            {n}
                        </p>
                        <p className="mt-2 font-semibold text-white">{t}</p>
                        <p className="mt-1 text-sm leading-relaxed text-cream/90">
                            {d}
                        </p>
                    </Reveal>
                ))}
            </section>

            <section className="mt-20">
                <Reveal>
                    <Head2
                        title="Best Rent"
                        sub="Perlengkapan outdoor dan elektronik favorit"
                    />
                </Reveal>
                <Grid items={best} />
            </section>

            <Reveal
                as="section"
                className="mt-20 overflow-hidden rounded-3xl bg-teal-deep text-cream"
            >
                <div className="grid items-center md:grid-cols-[1.3fr_1fr]">
                    <div className="p-7 sm:p-10">
                        <h2 className="text-2xl sm:text-3xl">
                            Punya barang yang jarang dipakai?
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/70">
                            Sewakan ke sesama mahasiswa dan dapat penghasilan
                            tambahan. Kamu yang atur harga dan tanggalnya.
                        </p>
                        <Link
                            href="/mitra/dashboard"
                            className="mt-6 inline-flex rounded-xl bg-cream px-6 py-3 text-sm font-semibold text-teal-deep transition duration-300 hover:bg-white hover:shadow-lg active:scale-[.97]"
                        >
                            Jadi mitra
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2 p-4 md:p-6">
                        {['rok-hitam', 'sepatu-gunung', 'sleeping-bag'].map(
                            (s) => (
                                <Thumb
                                    key={s}
                                    item={bySlug(s)}
                                    className="aspect-[3/4] rounded-xl"
                                />
                            ),
                        )}
                    </div>
                </div>
            </Reveal>
        </AppShell>
    );
}
