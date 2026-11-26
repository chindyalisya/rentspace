// @ts-nocheck
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    ChevronRight,
    HelpCircle,
    LogOut,
    MapPin,
    Palette,
    ShieldCheck,
    Store,
    UserRound,
    Wallet,
} from 'lucide-react';
import { AppShell } from '@/layouts/shell';

const menu = [
    [UserRound, 'Edit profil', '/settings/profile'],
    [BadgeCheck, 'Verifikasi identitas', '/verifikasi'],
    [MapPin, 'Alamat tersimpan', '/alamat'],
    [Wallet, 'Dompet dan deposit', '/dompet'],
    [Palette, 'Tampilan (terang / gelap)', '/settings/appearance'],
    [Store, 'Mode mitra', '/mitra/dashboard'],
    [HelpCircle, 'Pusat bantuan', '/bantuan'],
];

export default function Profil() {
    const user = usePage().props.auth?.user;
    const name = user?.name ?? 'Pengguna';
    const items = user?.is_admin
        ? [
              [ShieldCheck, 'Panel admin', '/admin/verifikasi'],
              ...menu.filter(([, , h]) => h !== '/verifikasi'),
          ]
        : menu;
    return (
        <AppShell>
            <Head title="Profil" />
            <div className="mx-auto max-w-2xl">
                <div className="relative overflow-hidden rounded-3xl bg-rose-soft p-6 sm:p-8">
                    <div className="relative flex items-center gap-4">
                        <span className="grid size-16 place-items-center rounded-full bg-teal-deep font-display text-2xl font-semibold text-paper shadow-md">
                            {name[0]}
                        </span>
                        <div>
                            <p className="text-xl font-semibold text-teal-ink">
                                {name}
                            </p>
                            <p className="text-sm text-teal-ink/70">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass mt-4 divide-y divide-ink/5 overflow-hidden rounded-3xl">
                    {items.map(([Icon, l, href]) => (
                        <Link
                            key={l}
                            href={href}
                            className="flex items-center gap-3 px-5 py-4 text-sm transition hover:bg-surface/60"
                        >
                            <Icon size={18} className="text-teal" />
                            <span className="flex-1">{l}</span>
                            <ChevronRight size={16} className="text-ink/30" />
                        </Link>
                    ))}
                </div>
                <button
                    onClick={() => router.post('/logout')}
                    className="glass mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium text-rose-deep transition hover:bg-surface/80"
                >
                    <LogOut size={17} />
                    Keluar
                </button>
            </div>
        </AppShell>
    );
}
