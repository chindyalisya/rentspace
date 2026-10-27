// @ts-nocheck
import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, CalendarDays, GraduationCap, Laptop, MapPin, Search, Shirt, ShieldCheck, Tent } from 'lucide-react';
import { Button, ProductCard, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';

const categories = [
  ['alat-camping', 'Alat camping', Tent, 'bg-teal/12 text-teal-deep'],
  ['elektronik', 'Elektronik', Laptop, 'bg-rose/25 text-rose-deep'],
  ['fashion', 'Fashion', Shirt, 'bg-rose-soft text-rose-deep'],
  ['akademik', 'Akademik', GraduationCap, 'bg-teal/8 text-teal-deep'],
];
const trust = [[ShieldCheck, 'Deposit dijamin sistem', 'Cair otomatis setelah barang kembali'], [BadgeCheck, 'Mitra terverifikasi', 'Identitas dicek lewat KTM'], [MapPin, 'Ambil di titik kampus', 'Atau minta diantar']];

/* Data dummy: nanti ganti props dari controller, Inertia::render('home', [...]) */
const dummy = [
  { slug: 'canon-eos-30d', name: 'Canon EOS 30D', emoji: '📷', price: 50000, rating: 4.9 },
  { slug: 'kalkulator-scientific', name: 'Kalkulator Scientific', emoji: '🧮', price: 5000, rating: 4.8 },
  { slug: 'almamater-unnes', name: 'Almamater UNNES', emoji: '🎓', price: 20000, rating: 4.8 },
  { slug: 'kemeja-putih-wanita', name: 'Kemeja Putih Wanita', emoji: '👔', price: 15000, rating: 4.7 },
];
const dummyBest = [
  { slug: 'carrier-eiger-45l', name: 'Carrier Eiger 45L', emoji: '🎒', price: 30000, rating: 4.9 },
  { slug: 'tenda-dome-4p', name: 'Tenda Dome 4 Orang', emoji: '⛺', price: 45000, rating: 4.8 },
  { slug: 'speaker-jbl', name: 'Speaker JBL', emoji: '🔊', price: 35000, rating: 4.7 },
  { slug: 'trekking-pole', name: 'Trekking Pole', emoji: '🥾', price: 10000, rating: 4.6 },
];

const Head2 = ({ title, light = false }) => (
  <div className="mb-5 flex items-end justify-between">
    <h2 className={`text-xl font-semibold tracking-tight sm:text-2xl ${light ? 'text-white' : 'text-teal-deep'}`}>{title}</h2>
    <Link href="/katalog" className={`text-sm font-semibold ${light ? 'text-rose-soft' : 'text-teal'}`}>Lihat semua</Link>
  </div>
);
const Grid = ({ items }) => <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{items.map((it) => <ProductCard key={it.slug} item={it} />)}</div>;

export default function Home({ featured = dummy, best = dummyBest, cartCount = 0 }) {
  return (
    <AppShell cartCount={cartCount}>
      <Head title="Beranda" />

      <section className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-rose-soft via-rose/60 to-cream p-6 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-cream/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 size-72 rounded-full bg-teal/25 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <h1 className="rs-rise text-4xl font-semibold leading-[1.06] tracking-tight text-teal-deep sm:text-5xl">Sewa perlengkapan kuliahmu, bayar per hari.</h1>
            <p className="rs-rise mt-4 max-w-lg text-teal-deep/80" style={{ animationDelay: '.1s' }}>Kamera, almamater, sampai alat camping dari sesama mahasiswa. Deposit aman sampai barang kembali.</p>
            <Link href="/cari" className="glass rs-rise mt-7 flex max-w-xl items-center gap-3 rounded-2xl p-2 pl-5 text-sm text-ink/55 transition hover:bg-white/80" style={{ animationDelay: '.2s' }}>
              <Search size={18} /><span className="flex-1">Cari kamera, tenda, almamater</span>
              <span className="rounded-xl bg-teal px-5 py-2.5 font-semibold text-white">Cari</span>
            </Link>
          </div>
          <div className="glass rs-rise rounded-[2rem] p-6" style={{ animationDelay: '.3s' }}>
            <p className="text-xs font-semibold text-ink/55">Contoh perhitungan sewa</p>
            <p className="mt-2 text-lg font-semibold text-teal-deep">Canon EOS 30D</p>
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/75 px-4 py-3 text-sm"><CalendarDays size={17} className="text-teal" />12 sampai 15 Sep 2026, 3 hari</div>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink/65">Sewa 3 hari</dt><dd className="font-semibold">{rupiah(150000)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/65">Deposit (dikembalikan)</dt><dd className="font-semibold">{rupiah(100000)}</dd></div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base"><dt className="font-semibold">Total dibayar</dt><dd className="font-semibold text-teal">{rupiah(250000)}</dd></div>
            </dl>
            <Button className="mt-5">Sewa sekarang</Button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {categories.map(([slug, label, Icon, tone]) => (
          <Link key={slug} href={`/katalog/${slug}`} className={`group glass flex h-28 flex-col justify-between rounded-3xl p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-32`}>
            <span className={`grid size-10 place-items-center rounded-xl transition duration-300 group-hover:scale-110 ${tone}`}><Icon size={20} /></span>
            <p className="text-sm font-medium text-ink">{label}</p>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {trust.map(([Icon, t, d]) => (
          <div key={t} className="glass flex items-start gap-3 rounded-2xl p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose-soft text-rose-deep"><Icon size={19} /></span>
            <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-ink/55">{d}</p></div>
          </div>
        ))}
      </section>

      <section className="mt-12"><Head2 title="Produk pilihan" /><Grid items={featured} /></section>

      <section className="mt-12 rounded-[2.25rem] bg-teal/8 p-5 sm:p-8">
        <Head2 title="Best Rent" /><Grid items={best} />
      </section>

      <section className="glass mt-12 flex flex-col items-start gap-4 rounded-[2rem] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-teal-deep">Punya barang yang jarang dipakai?</h2>
          <p className="mt-1 text-sm text-ink/65">Sewakan ke sesama mahasiswa dan dapat penghasilan tambahan.</p>
        </div>
        <Link href="/register" className="shrink-0 rounded-2xl bg-gradient-to-b from-rose to-rose-deep px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose/30 transition hover:brightness-105">Jadi mitra</Link>
      </section>
    </AppShell>
  );
}
