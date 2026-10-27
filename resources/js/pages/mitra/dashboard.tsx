// @ts-nocheck
import { Head, Link } from '@inertiajs/react';
import {
    ChevronRight,
    PackageCheck,
    Star,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { StatusBadge, rupiah, Thumb } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import {
    bySlug,
    mitraItems,
    mitraRequests,
    mitraStats as s,
    orders,
} from '@/lib/dummy';

const stats = [
    [Wallet, 'Pendapatan bulan ini', rupiah(s.pendapatanBulanIni)],
    [TrendingUp, 'Sewa aktif', `${s.sewaAktif} barang`],
    [PackageCheck, 'Barang aktif', `${s.barangAktif} barang`],
    [Star, 'Rating mitra', s.rating],
];
const aktif = orders.filter((o) =>
    ['Sedang Disewa', 'Jatuh Tempo'].includes(o.status),
);

export default function MitraDashboard() {
    return (
        <AppShell>
            <Head title="Dashboard mitra" />
            <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">
                Dashboard mitra
            </h1>
            <p className="mt-1 text-sm text-ink/60">
                Ringkasan barang dan sewa yang kamu kelola.
            </p>
            <MitraTabs active="/mitra/dashboard" />

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([Icon, l, v]) => (
                    <div key={l} className="glass rounded-3xl p-4">
                        <span className="grid size-9 place-items-center rounded-xl bg-teal/10 text-teal-deep">
                            <Icon size={17} />
                        </span>
                        <p className="mt-3 text-lg font-semibold text-teal-deep">
                            {v}
                        </p>
                        <p className="text-xs text-ink/55">{l}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <section className="glass rounded-3xl p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="font-medium text-teal-deep">
                            Permintaan sewa masuk
                        </p>
                        {mitraRequests.length > 0 && (
                            <span className="rounded-full bg-rose/25 px-2.5 py-0.5 text-xs font-medium text-rose-deep">
                                {mitraRequests.length} baru
                            </span>
                        )}
                    </div>
                    <div className="space-y-2.5">
                        {mitraRequests.map((r) => {
                            const it = bySlug(r.slug);
                            return (
                                <div
                                    key={r.id}
                                    className="flex items-center gap-3 rounded-2xl bg-white/60 p-3"
                                >
                                    <Thumb
                                        item={it}
                                        zoom={false}
                                        className="size-11 rounded-lg"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {it.name}
                                        </p>
                                        <p className="text-xs text-ink/55">
                                            {r.penyewa} · {r.start} sampai{' '}
                                            {r.end}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {!mitraRequests.length && (
                            <p className="text-sm text-ink/55">
                                Belum ada permintaan baru.
                            </p>
                        )}
                    </div>
                    <Link
                        href="/mitra/kalender"
                        className="mt-4 flex items-center gap-1 text-sm font-medium text-teal"
                    >
                        Kelola permintaan
                        <ChevronRight size={15} />
                    </Link>
                </section>

                <section className="glass rounded-3xl p-5">
                    <p className="mb-3 font-medium text-teal-deep">
                        Sewa yang sedang berjalan
                    </p>
                    <div className="space-y-2.5">
                        {aktif.map((o) => {
                            const it = bySlug(o.slug);
                            return (
                                <div
                                    key={o.id}
                                    className="flex items-center gap-3 rounded-2xl bg-white/60 p-3"
                                >
                                    <Thumb
                                        item={it}
                                        zoom={false}
                                        className="size-11 rounded-lg"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {it.name}
                                        </p>
                                        <p className="text-xs text-ink/55">
                                            Sampai {o.end}
                                        </p>
                                    </div>
                                    <StatusBadge status={o.status} />
                                </div>
                            );
                        })}
                        {!aktif.length && (
                            <p className="text-sm text-ink/55">
                                Belum ada barang yang sedang disewa.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <section className="glass mt-6 rounded-3xl p-5">
                <p className="mb-3 font-medium text-teal-deep">Barangmu</p>
                <div className="grid gap-2.5 sm:grid-cols-3">
                    {mitraItems.map((it) => (
                        <div
                            key={it.slug}
                            className="flex items-center gap-3 rounded-2xl bg-white/60 p-3"
                        >
                            <Thumb
                                item={it}
                                zoom={false}
                                className="size-11 rounded-lg"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    {it.name}
                                </p>
                                <p className="text-xs text-ink/55">
                                    {rupiah(it.price)}/hari
                                </p>
                            </div>
                            <span
                                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${it.status === 'Aktif' ? 'bg-teal/10 text-teal-deep' : 'bg-ink/8 text-ink/50'}`}
                            >
                                {it.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </AppShell>
    );
}
