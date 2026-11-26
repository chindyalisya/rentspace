// @ts-nocheck
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    ChevronRight,
    ReceiptText,
    Search,
    ShieldCheck,
    Store,
} from 'lucide-react';
import { AppShell } from '@/layouts/shell';

export default function Dashboard() {
    const user = usePage().props.auth?.user;
    const tones = [
        'bg-teal/10 text-teal-ink',
        'bg-clay-soft text-clay-ink',
        'bg-rose-soft text-rose-deep',
        'bg-sand text-teal-ink',
    ];
    const links = [
        [
            Search,
            'Cari barang sewaan',
            'Jelajahi katalog barang dari mahasiswa lain',
            '/katalog',
        ],
        [
            ReceiptText,
            'Pesanan saya',
            'Pantau status sewa dan pengembalian',
            '/pesanan',
        ],
        [
            Store,
            'Mode mitra',
            'Kelola barang yang kamu sewakan',
            '/mitra/dashboard',
        ],
        [
            BadgeCheck,
            'Verifikasi identitas',
            'Cek status verifikasi KTM atau KTP kamu',
            '/verifikasi',
        ],
    ];
    // Admin tidak perlu verifikasi identitas
    if (user?.is_admin) {
        links.splice(
            links.findIndex((l) => l[3] === '/verifikasi'),
            1,
        );
        links.push([
            ShieldCheck,
            'Panel admin',
            'Tinjau pengajuan verifikasi identitas',
            '/admin/verifikasi',
        ]);
    }

    return (
        <AppShell>
            <Head title="Dashboard" />
            <div className="rounded-3xl bg-rose-soft p-6 sm:p-8">
                <p className="text-sm text-teal-ink/70">
                    Selamat datang kembali
                </p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-teal-ink">
                    Halo, {user?.name ?? 'Pengguna'}
                </h1>
                <p className="mt-2 max-w-md text-sm text-teal-ink/70">
                    Mau sewa barang untuk kuliahmu, atau sewakan barang yang
                    jarang terpakai?
                </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {links.map(([Icon, title, desc, href], n) => (
                    <Link
                        key={href}
                        href={href}
                        className="glass rs-card flex items-center gap-4 rounded-3xl p-5"
                    >
                        <span
                            className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tones[n % tones.length]}`}
                        >
                            <Icon size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-teal-ink">
                                {title}
                            </span>
                            <span className="block text-xs text-ink/55">
                                {desc}
                            </span>
                        </span>
                        <ChevronRight size={16} className="text-ink/30" />
                    </Link>
                ))}
            </div>
        </AppShell>
    );
}
