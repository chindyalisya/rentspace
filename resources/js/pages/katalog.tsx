// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, SearchX } from 'lucide-react';
import { ProductCard, Thumb } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { cats, items } from '@/lib/dummy';

/* Tiap kategori punya warna sendiri: banner, teks, dan chip aktif */
const tema = {
    semua: {
        banner: 'bg-teal-deep text-paper',
        sub: 'text-paper/90',
        chip: 'bg-teal-deep text-paper',
        desc: 'Semua barang dari sesama mahasiswa, siap disewa per hari.',
    },
    'alat-camping': {
        banner: 'bg-teal text-white dark:text-cream',
        sub: 'text-white/90 dark:text-cream/90',
        chip: 'bg-teal text-white dark:text-cream',
        desc: 'Tenda, carrier, dan perlengkapan untuk naik gunung.',
    },
    elektronik: {
        banner: 'bg-clay text-white',
        sub: 'text-white/90',
        chip: 'bg-clay text-white',
        desc: 'Kamera, speaker, dan alat elektronik untuk project kuliah.',
    },
    fashion: {
        banner: 'bg-rose-soft text-teal-ink',
        sub: 'text-teal-ink/75',
        chip: 'bg-clay-deep text-white',
        desc: 'Pakaian dan sepatu untuk sidang, wawancara, dan acara formal.',
    },
    akademik: {
        banner: 'bg-sand text-teal-ink',
        sub: 'text-teal-ink/75',
        chip: 'bg-ink text-cream',
        desc: 'Almamater dan alat kuliah yang cuma dipakai sesekali.',
    },
};
const sorts = {
    populer: (a, b) => b.rating - a.rating,
    murah: (a, b) => a.price - b.price,
    mahal: (a, b) => b.price - a.price,
};

export default function Katalog({ kategori = 'semua', q = '' }) {
    const [query, setQuery] = useState(q);
    const [sort, setSort] = useState('populer');
    const list = items
        .filter(
            (i) =>
                (kategori === 'semua' || i.cat === kategori) &&
                i.name.toLowerCase().includes(query.toLowerCase()),
        )
        .sort(sorts[sort]);
    const t = tema[kategori] ?? tema.semua;
    const judul =
        kategori === 'semua'
            ? 'Katalog barang'
            : (cats.find(([s]) => s === kategori)?.[1] ?? 'Katalog barang');
    const contoh = items
        .filter((i) => kategori === 'semua' || i.cat === kategori)
        .slice(0, 3);
    return (
        <AppShell>
            <Head title="Katalog" />
            <div
                className={`rs-rise relative overflow-hidden rounded-3xl p-6 sm:p-8 ${t.banner}`}
            >
                <div className="relative z-10 max-w-md">
                    <h1 className="text-3xl sm:text-4xl">{judul}</h1>
                    <p className={`mt-2 text-sm ${t.sub}`}>{t.desc}</p>
                    <p className={`mt-3 text-xs font-semibold ${t.sub}`}>
                        {list.length} barang tersedia untuk disewa
                    </p>
                </div>
                <div className="absolute top-1/2 right-6 hidden -translate-y-1/2 gap-3 md:flex">
                    {contoh.map((it, n) => (
                        <div
                            key={it.slug}
                            className={`size-24 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/60 lg:size-28 ${['-rotate-3', 'rotate-2', '-rotate-1'][n]}`}
                        >
                            <Thumb
                                item={it}
                                zoom={false}
                                className="size-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
                <label className="glass flex flex-1 items-center gap-2 rounded-xl px-4 py-3 transition focus-within:border-teal/50 focus-within:ring-4 focus-within:ring-teal/10">
                    <Search size={17} className="text-teal" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari barang"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
                    />
                </label>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="Urutkan"
                    className="glass rounded-xl px-4 py-3 text-sm outline-none"
                >
                    <option value="populer">Paling populer</option>
                    <option value="murah">Harga terendah</option>
                    <option value="mahal">Harga tertinggi</option>
                </select>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {cats.map(([s, l]) => (
                    <Link
                        key={s}
                        href={`/katalog/${s}`}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${kategori === s ? `${tema[s]?.chip ?? tema.semua.chip} shadow-sm` : 'glass text-ink/70 hover:bg-surface/80'}`}
                    >
                        {l}
                    </Link>
                ))}
            </div>
            {list.length ? (
                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                    {list.map((it, n) => (
                        <ProductCard key={it.slug} item={it} index={n} />
                    ))}
                </div>
            ) : (
                <div className="glass mt-8 grid place-items-center rounded-3xl px-6 py-16 text-center">
                    <SearchX size={36} className="text-rose-deep/60" />
                    <p className="mt-3 font-medium">Barang tidak ditemukan</p>
                    <p className="text-sm text-ink/55">
                        Coba kata kunci lain atau pilih kategori berbeda.
                    </p>
                </div>
            )}
        </AppShell>
    );
}
