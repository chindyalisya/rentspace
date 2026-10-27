// @ts-nocheck
import { Link, usePage } from '@inertiajs/react';
import { Bell, Home, ReceiptText, Search, ShoppingBag, User } from 'lucide-react';
import { Logo } from '@/components/rs';

export const Page = ({ children, className = '' }) => (
  <div className={`rs-mesh min-h-screen font-sans text-ink antialiased ${className}`}>{children}</div>
);

const tabs = [['/home', Home, 'Beranda'], ['/pesanan', ReceiptText, 'Pesanan'], ['/keranjang', ShoppingBag, 'Keranjang'], ['/profil', User, 'Profil']];

/* Halaman setelah login: top bar di desktop, bottom nav melayang di mobile */
export function AppShell({ children, cartCount = 0 }) {
  const { url } = usePage();
  const on = (h) => url.startsWith(h);
  return (
    <Page className="pb-28 md:pb-0">
      <header className="glass sticky top-0 z-30 rounded-none border-x-0 border-t-0">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
          <Link href="/home"><Logo /></Link>
          <nav className="ml-6 hidden gap-1 md:flex">
            {tabs.map(([h, , l]) => (
              <Link key={h} href={h} className={`rounded-xl px-3.5 py-2 text-sm font-medium transition ${on(h) ? 'bg-teal text-white' : 'text-ink/70 hover:bg-white/70'}`}>{l}</Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/cari" className="glass hidden w-72 items-center gap-2 rounded-2xl px-4 py-2 text-sm text-ink/50 lg:flex"><Search size={16} />Cari barang</Link>
            <Link href="/notifikasi" aria-label="Notifikasi" className="glass grid size-10 place-items-center rounded-2xl"><Bell size={18} /></Link>
            <Link href="/keranjang" aria-label="Keranjang" className="glass relative grid size-10 place-items-center rounded-2xl">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-deep text-[10px] font-semibold text-white">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">{children}</main>
      <nav className="glass fixed inset-x-4 bottom-4 z-30 flex gap-1 rounded-3xl p-1.5 md:hidden">
        {tabs.map(([h, Icon, l]) => (
          <Link key={h} href={h} className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-medium ${on(h) ? 'bg-teal text-white' : 'text-ink/60'}`}>
            <Icon size={19} />{l}
          </Link>
        ))}
      </nav>
    </Page>
  );
}

/* Login / Register / Verifikasi: split di desktop, satu kolom di mobile */
export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <Page className="grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-deep to-teal p-12 text-white lg:flex">
        <div className="absolute -right-24 top-1/3 size-96 rounded-full bg-rose/25 blur-3xl" />
        <Logo light className="relative" />
        <div className="relative">
          <h2 className="max-w-md text-4xl font-semibold leading-[1.1] tracking-tight">Sewa apa pun untuk kuliahmu, tanpa harus beli.</h2>
          <p className="mt-4 max-w-sm text-white/75">Kamera untuk project, almamater untuk sidang, carrier untuk naik gunung. Deposit dijamin sistem sampai barang kembali.</p>
        </div>
        <div className="glass-dark relative max-w-sm rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Canon EOS 30D</p>
            <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-200">Sedang Disewa</span>
          </div>
          <dl className="mt-4 space-y-2 text-sm text-white/80">
            <div className="flex justify-between"><dt>12 sampai 15 Sep, 3 hari</dt><dd>Rp150.000</dd></div>
            <div className="flex justify-between"><dt>Deposit dijamin sistem</dt><dd>Rp100.000</dd></div>
          </dl>
        </div>
      </aside>
      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-lg">
          <Logo className="mb-8 lg:hidden" />
          <div className="glass rounded-[2rem] p-6 sm:p-9">
            <h1 className="text-2xl font-semibold tracking-tight text-teal-deep sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-ink/60">{subtitle}</p>}
            <div className="mt-7">{children}</div>
          </div>
          {footer && <p className="mt-6 text-center text-sm text-ink/70">{footer}</p>}
        </div>
      </div>
    </Page>
  );
}

/* Tab navigasi khusus halaman mitra */
export function MitraTabs({ active }) {
  const tabs = [['/mitra/dashboard', 'Dashboard'], ['/mitra/barang', 'Barang saya'], ['/mitra/tambah-barang', 'Tambah barang'], ['/mitra/kalender', 'Kalender & permintaan']];
  return (
    <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
      {tabs.map(([h, l]) => (
        <a key={h} href={h} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active === h ? 'bg-teal text-white shadow-sm' : 'glass text-ink/70 hover:bg-white/80'}`}>{l}</a>
      ))}
    </div>
  );
}
