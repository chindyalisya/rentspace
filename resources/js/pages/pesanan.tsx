// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Check, ChevronRight, Star } from 'lucide-react';
import { Button, StatusBadge, rupiah, Thumb } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { bySlug, orders } from '@/lib/dummy';

const tabs = [
    ['Semua', () => true],
    [
        'Aktif',
        (o) =>
            [
                'Sedang Disewa',
                'Jatuh Tempo',
                'Dikonfirmasi',
                'Menunggu Konfirmasi',
            ].includes(o.status),
    ],
    ['Selesai', (o) => o.status === 'Selesai'],
    ['Dibatalkan', (o) => o.status === 'Dibatalkan'],
];
const steps = [
    'Pesanan dibuat',
    'Dikonfirmasi mitra',
    'Barang diserahkan',
    'Sedang disewa',
    'Dikembalikan',
    'Selesai',
];
const at = {
    'Menunggu Konfirmasi': 0,
    Dikonfirmasi: 1,
    'Sedang Disewa': 3,
    'Jatuh Tempo': 3,
    Dikembalikan: 4,
    Selesai: 5,
};

function Detail({ o }) {
    const it = bySlug(o.slug);
    const [aksi, setAksi] = useState(null);
    const [sent, setSent] = useState(false);
    const [star, setStar] = useState(0);
    const active = ['Sedang Disewa', 'Jatuh Tempo'].includes(o.status);
    const row = (k, v) => (
        <div className="flex justify-between text-sm">
            <dt className="text-ink/55">{k}</dt>
            <dd>{v}</dd>
        </div>
    );
    return (
        <>
            <Link href="/pesanan" className="text-sm text-teal">
                Kembali ke pesanan
            </Link>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                <div className="space-y-4">
                    <div className="glass flex items-center gap-4 rounded-3xl p-5">
                        <Thumb
                            item={it}
                            zoom={false}
                            className="size-20 rounded-xl"
                        />
                        <div className="flex-1">
                            <p className="font-medium">{it.name}</p>
                            <p className="text-xs text-ink/55">
                                {o.start} sampai {o.end}
                            </p>
                            <div className="mt-2">
                                <StatusBadge status={o.status} />
                            </div>
                        </div>
                    </div>
                    <dl className="glass space-y-2.5 rounded-3xl p-5">
                        {row('Kode', o.id)}
                        {row('Mitra', o.mitra)}
                        {row('Pengambilan', o.lokasi)}
                        {row('Pembayaran', o.bayar)}
                        {row('Total', rupiah(o.total))}
                    </dl>
                </div>
                <div className="space-y-4">
                    <div className="glass rounded-3xl p-5">
                        <p className="mb-4 font-medium">Status pesanan</p>
                        <ol className="space-y-4">
                            {steps.map((s, i) => {
                                const done =
                                    o.status !== 'Dibatalkan' &&
                                    i <= at[o.status];
                                return (
                                    <li
                                        key={s}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <span
                                            className={`grid size-6 place-items-center rounded-full ${done ? 'bg-teal-deep text-cream' : 'border border-ink/15 bg-white/70'}`}
                                        >
                                            {done && <Check size={13} />}
                                        </span>
                                        <span
                                            className={
                                                done ? '' : 'text-ink/40'
                                            }
                                        >
                                            {s}
                                        </span>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    {active && (
                        <div className="glass rounded-3xl p-5">
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="soft"
                                    onClick={() => setAksi('serah')}
                                >
                                    Serah terima
                                </Button>
                                <Button onClick={() => setAksi('kembali')}>
                                    Ajukan pengembalian
                                </Button>
                            </div>
                            {aksi &&
                                (sent ? (
                                    <p className="mt-4 text-center text-sm text-teal">
                                        Terkirim. Menunggu konfirmasi mitra.
                                    </p>
                                ) : (
                                    <div className="mt-4 space-y-3">
                                        <p className="text-sm text-ink/60">
                                            Unggah foto kondisi barang
                                            {aksi === 'serah'
                                                ? ' saat diterima'
                                                : ' sebelum dikembalikan'}
                                            .
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="w-full rounded-2xl border border-dashed border-teal/40 bg-white/60 p-3 text-xs"
                                        />
                                        <textarea
                                            rows={2}
                                            placeholder="Catatan (opsional)"
                                            className="w-full rounded-2xl border border-white/80 bg-white/70 p-3 text-sm outline-none focus:border-teal"
                                        />
                                        <Button onClick={() => setSent(true)}>
                                            Kirim
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    )}
                    {o.status === 'Selesai' && (
                        <div className="glass rounded-3xl p-5">
                            <p className="font-medium">Beri ulasan</p>
                            <div className="my-3 flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        aria-label={`${n} bintang`}
                                        onClick={() => setStar(n)}
                                    >
                                        <Star
                                            size={26}
                                            className={
                                                n <= star
                                                    ? 'fill-amber-400 text-amber-400'
                                                    : 'text-ink/25'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                            <Button
                                disabled={!star}
                                onClick={() => setSent(true)}
                            >
                                {sent ? 'Terima kasih' : 'Kirim ulasan'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default function Pesanan({ id = null }) {
    const [tab, setTab] = useState(0);
    const detail = id && orders.find((o) => o.id === id);
    return (
        <AppShell>
            <Head title="Pesanan" />
            {detail ? (
                <Detail o={detail} />
            ) : (
                <>
                    <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">
                        Pesanan saya
                    </h1>
                    <div className="mt-5 flex gap-2 overflow-x-auto">
                        {tabs.map(([l], n) => (
                            <button
                                key={l}
                                onClick={() => setTab(n)}
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${tab === n ? 'bg-teal-deep text-cream shadow-md' : 'glass text-ink/70'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {orders.filter(tabs[tab][1]).map((o) => {
                            const it = bySlug(o.slug);
                            return (
                                <Link
                                    key={o.id}
                                    href={`/pesanan/${o.id}`}
                                    className="glass flex items-center gap-4 rounded-3xl p-4 transition hover:-translate-y-0.5"
                                >
                                    <Thumb
                                        item={it}
                                        zoom={false}
                                        className="size-16 rounded-xl"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-medium">
                                            {it.name}
                                        </p>
                                        <p className="text-xs text-ink/55">
                                            {o.start} sampai {o.end}
                                        </p>
                                        <div className="mt-1.5">
                                            <StatusBadge status={o.status} />
                                        </div>
                                    </div>
                                    <ChevronRight
                                        size={18}
                                        className="text-ink/30"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </AppShell>
    );
}
