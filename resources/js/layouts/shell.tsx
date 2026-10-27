// @ts-nocheck
import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    Home,
    ReceiptText,
    Search,
    ShoppingBag,
    User,
} from 'lucide-react';
import { Logo, Thumb } from '@/components/rs';
import { bySlug } from '@/lib/dummy';

export const Page = ({ children, className = '' }) => (
    <div
        className={`rs-mesh min-h-screen font-sans text-ink antialiased ${className}`}
    >
        {children}
    </div>
);

const tabs = [
    ['/home', Home, 'Beranda'],
    ['/pesanan', ReceiptText, 'Pesanan'],
    ['/keranjang', ShoppingBag, 'Keranjang'],
    ['/profil', User, 'Profil'],
];

/* Halaman setelah login: top bar di desktop, bottom nav di mobile */
export function AppShell({ children, cartCount = 0 }) {
    const { url } = usePage();
    const on = (h) => url.startsWith(h);
    return (
        <Page className="pb-28 md:pb-0">
            <header className="rs-bar sticky top-0 z-30">
                <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
                    <Link href="/home">
                        <Logo />
                    </Link>
                    <nav className="ml-6 hidden gap-1 md:flex">
                        {tabs.map(([h, , l]) => (
                            <Link
                                key={h}
                                href={h}
                                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition duration-300 ${on(h) ? 'text-teal-deep after:absolute after:inset-x-3.5 after:-bottom-[1px] after:h-0.5 after:origin-left after:animate-[rs-grow_.4s_var(--ease-out-expo)_both] after:rounded-full after:bg-rose-deep' : 'text-ink/60 hover:text-teal-deep'}`}
                            >
                                {l}
                            </Link>
                        ))}
                    </nav>
                    <div className="ml-auto flex items-center gap-2">
                        <Link
                            href="/cari"
                            className="hidden w-72 items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-4 py-2 text-sm text-ink/50 transition hover:bg-white lg:flex"
                        >
                            <Search size={16} />
                            Cari barang
                        </Link>
                        <Link
                            href="/notifikasi"
                            aria-label="Notifikasi"
                            className="grid size-10 place-items-center rounded-xl text-ink/70 transition hover:bg-white/80"
                        >
                            <Bell size={18} />
                        </Link>
                        <Link
                            href="/keranjang"
                            aria-label="Keranjang"
                            className="relative grid size-10 place-items-center rounded-xl text-ink/70 transition hover:bg-white/80"
                        >
                            <ShoppingBag size={18} />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 grid size-4 place-items-center rounded-full bg-rose-deep text-[10px] font-semibold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>
            <main
                key={url}
                className="rs-page mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10"
            >
                {children}
            </main>
            <nav className="fixed inset-x-4 bottom-4 z-30 flex gap-1 rounded-2xl border border-ink/10 bg-white/95 p-1.5 shadow-xl shadow-ink/10 backdrop-blur md:hidden">
                {tabs.map(([h, Icon, l]) => (
                    <Link
                        key={h}
                        href={h}
                        className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-medium transition duration-300 ${on(h) ? 'bg-teal-deep text-cream' : 'text-ink/55'}`}
                    >
                        <Icon size={19} />
                        {l}
                    </Link>
                ))}
            </nav>
        </Page>
    );
}

/* Login / Register / Verifikasi: split di desktop, satu kolom di mobile */
export function AuthShell({ title, subtitle, children, footer }) {
    const m = [
        'tenda-dome-4p',
        'canon-eos-30d',
        'sneakers-putih',
        'carrier-eiger-45l',
    ].map(bySlug);
    return (
        <Page className="grid lg:grid-cols-[1.05fr_1fr]">
            <aside className="relative hidden flex-col justify-between overflow-hidden bg-teal-deep p-12 text-cream lg:flex">
                <Logo light className="relative" />
                <div className="relative">
                    <div className="grid grid-cols-6 grid-rows-2 gap-3">
                        {m.map((it, n) => (
                            <Thumb
                                key={it.slug}
                                item={it}
                                eager
                                className={`rs-pop rounded-2xl ring-1 ring-white/20 ${['col-span-4 aspect-[16/10]', 'col-span-2 aspect-square self-end', 'col-span-2 aspect-square', 'col-span-4 aspect-[16/10]'][n]}`}
                            />
                        ))}
                    </div>
                    <h2 className="mt-9 max-w-md text-4xl leading-[1.12]">
                        Sewa apa pun untuk kuliahmu, tanpa harus beli.
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
                        Kamera untuk project, almamater untuk sidang, carrier
                        untuk naik gunung. Deposit dijamin sistem sampai barang
                        kembali.
                    </p>
                </div>
                <p className="relative text-xs text-cream/50">
                    Dari mahasiswa, untuk mahasiswa.
                </p>
            </aside>
            <div className="flex items-center justify-center p-5 sm:p-10">
                <div className="rs-rise w-full max-w-lg">
                    <Logo className="mb-8 lg:hidden" />
                    <div className="glass rounded-3xl p-6 sm:p-9">
                        <h1 className="text-2xl text-teal-deep sm:text-3xl">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-1.5 text-sm text-ink/60">
                                {subtitle}
                            </p>
                        )}
                        <div className="mt-7">{children}</div>
                    </div>
                    {footer && (
                        <p className="mt-6 text-center text-sm text-ink/70">
                            {footer}
                        </p>
                    )}
                </div>
            </div>
        </Page>
    );
}

/* Tab navigasi khusus halaman mitra */
export function MitraTabs({ active }) {
    const tabs = [
        ['/mitra/dashboard', 'Dashboard'],
        ['/mitra/barang', 'Barang saya'],
        ['/mitra/tambah-barang', 'Tambah barang'],
        ['/mitra/kalender', 'Kalender & permintaan'],
    ];
    return (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {tabs.map(([h, l]) => (
                <a
                    key={h}
                    href={h}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${active === h ? 'bg-teal-deep text-cream shadow-sm' : 'glass text-ink/70 hover:bg-white'}`}
                >
                    {l}
                </a>
            ))}
        </div>
    );
}
