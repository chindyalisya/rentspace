// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, SearchX } from 'lucide-react';
import { ProductCard } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { cats, items } from '@/lib/dummy';

const sorts = { populer: (a, b) => b.rating - a.rating, murah: (a, b) => a.price - b.price, mahal: (a, b) => b.price - a.price };

export default function Katalog({ kategori = 'semua', q = '' }) {
  const [query, setQuery] = useState(q);
  const [sort, setSort] = useState('populer');
  const list = items.filter((i) => (kategori === 'semua' || i.cat === kategori) && i.name.toLowerCase().includes(query.toLowerCase())).sort(sorts[sort]);
  return (
    <AppShell>
      <Head title="Katalog" />
      <h1 className="rs-rise text-3xl text-teal-deep sm:text-4xl">Katalog barang</h1>
      <p className="mt-1 text-sm text-ink/60">{list.length} barang tersedia untuk disewa.</p>
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="glass flex flex-1 items-center gap-2 rounded-xl px-4 py-3 transition focus-within:border-teal/50 focus-within:ring-4 focus-within:ring-teal/10">
          <Search size={17} className="text-teal" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari barang" className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Urutkan" className="glass rounded-xl px-4 py-3 text-sm outline-none">
          <option value="populer">Paling populer</option><option value="murah">Harga terendah</option><option value="mahal">Harga tertinggi</option>
        </select>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {cats.map(([s, l]) => (
          <Link key={s} href={`/katalog/${s}`} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${kategori === s ? 'bg-teal-deep text-cream shadow-sm' : 'glass text-ink/70 hover:bg-white/80'}`}>{l}</Link>
        ))}
      </div>
      {list.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">{list.map((it, n) => <ProductCard key={it.slug} item={it} index={n} />)}</div>
      ) : (
        <div className="glass mt-8 grid place-items-center rounded-3xl px-6 py-16 text-center">
          <SearchX size={36} className="text-rose-deep/60" />
          <p className="mt-3 font-medium">Barang tidak ditemukan</p>
          <p className="text-sm text-ink/55">Coba kata kunci lain atau pilih kategori berbeda.</p>
        </div>
      )}
    </AppShell>
  );
}
