// @ts-nocheck
import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Download,
    ReceiptText,
    TrendingDown,
    TrendingUp,
    Trophy,
    Wallet,
} from 'lucide-react';
import { StatusBadge, rupiah } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import { LAPORAN_REF, bySlug, laporanTransaksi } from '@/lib/dummy';

const HARI = 86400000;
const REF = new Date(`${LAPORAN_REF}T00:00:00Z`);
const bulanPendek = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
];
const bulanPanjang = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];
const iso = (d) => d.toISOString().slice(0, 10);
const tgl = (d) => `${d.getUTCDate()} ${bulanPendek[d.getUTCMonth()]}`;
const tglPanjang = (s) => {
    const d = new Date(`${s}T00:00:00Z`);
    return `${tgl(d)} ${d.getUTCFullYear()}`;
};
const singkat = (n) =>
    n >= 1e6
        ? `${(n / 1e6).toFixed(1).replace('.0', '').replace('.', ',')}jt`
        : n > 0
          ? `${Math.round(n / 1000)}rb`
          : '0';

/* Periode: 8 minggu terakhir (Senin-Minggu) atau 6 bulan terakhir */
function buatPeriode(mode) {
    if (mode === 'mingguan') {
        const wd = (REF.getUTCDay() + 6) % 7;
        const senin = new Date(REF.getTime() - wd * HARI);
        return Array.from({ length: 8 }, (_, i) => {
            const dari = new Date(senin.getTime() - (7 - i) * 7 * HARI);
            const sampai = new Date(dari.getTime() + 6 * HARI);
            return {
                dari: iso(dari),
                sampai: iso(sampai),
                label: tgl(dari),
                penuh: `${tgl(dari)} sampai ${tgl(sampai)} ${sampai.getUTCFullYear()}`,
            };
        });
    }
    return Array.from({ length: 6 }, (_, i) => {
        const dari = new Date(
            Date.UTC(REF.getUTCFullYear(), REF.getUTCMonth() - 5 + i, 1),
        );
        const sampai = new Date(
            Date.UTC(dari.getUTCFullYear(), dari.getUTCMonth() + 1, 0),
        );
        return {
            dari: iso(dari),
            sampai: iso(sampai),
            label: bulanPendek[dari.getUTCMonth()],
            penuh: `${bulanPanjang[dari.getUTCMonth()]} ${dari.getUTCFullYear()}`,
        };
    });
}

function hitung(periode) {
    return periode.map((p) => {
        const rows = laporanTransaksi.filter(
            (t) => t.tanggal >= p.dari && t.tanggal <= p.sampai,
        );
        const sah = rows.filter((t) => t.status !== 'Dibatalkan');
        const pendapatan = sah.reduce((a, t) => a + t.total, 0);
        const perBarang = {};
        sah.forEach((t) => {
            perBarang[t.slug] = (perBarang[t.slug] ?? 0) + t.total;
        });
        const [terlaris] =
            Object.entries(perBarang).sort((a, b) => b[1] - a[1])[0] ?? [];
        return {
            ...p,
            rows,
            pendapatan,
            jumlah: sah.length,
            batal: rows.length - sah.length,
            terlaris,
        };
    });
}

function unduhCsv(mode, data) {
    const baris = [
        [
            'Periode',
            'Tanggal',
            'ID',
            'Barang',
            'Penyewa',
            'Durasi (hari)',
            'Total (Rp)',
            'Status',
        ],
    ];
    data.forEach((b) =>
        b.rows.forEach((t) =>
            baris.push([
                b.penuh,
                t.tanggal,
                t.id,
                bySlug(t.slug).name,
                t.penyewa,
                t.hari,
                t.total,
                t.status,
            ]),
        ),
    );
    const csv = baris
        .map((r) =>
            r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','),
        )
        .join('\n');
    const url = URL.createObjectURL(
        new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-penjualan-${mode}-${LAPORAN_REF}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

export default function Laporan() {
    const [mode, setMode] = useState('mingguan');
    const data = useMemo(() => hitung(buatPeriode(mode)), [mode]);
    const [pilih, setPilih] = useState(null);
    const idx = pilih ?? data.length - 1;
    const cur = data[idx];
    const prev = data[idx - 1];
    const maks = Math.max(...data.map((b) => b.pendapatan), 1);
    const total = data.reduce((a, b) => a + b.pendapatan, 0);
    const satuan = mode === 'mingguan' ? 'minggu' : 'bulan';
    const delta =
        prev && prev.pendapatan > 0
            ? Math.round(
                  ((cur.pendapatan - prev.pendapatan) / prev.pendapatan) * 100,
              )
            : null;
    const rata = cur.jumlah ? Math.round(cur.pendapatan / cur.jumlah) : 0;
    const terlaris = cur.terlaris ? bySlug(cur.terlaris).name : '-';

    const ganti = (m) => {
        setMode(m);
        setPilih(null);
    };

    return (
        <AppShell>
            <Head title="Laporan penjualan" />
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-teal-ink">
                        Laporan penjualan
                    </h1>
                    <p className="mt-1 text-sm text-ink/75">
                        Pendapatan dan transaksi sewa dari barang milikmu.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => unduhCsv(mode, data)}
                    className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-teal-ink transition hover:bg-surface active:scale-[.97]"
                >
                    <Download size={16} />
                    Unduh CSV
                </button>
            </div>
            <MitraTabs active="/mitra/laporan" />

            <div
                className="mt-6 inline-flex rounded-2xl bg-teal/10 p-1"
                role="tablist"
                aria-label="Periode laporan"
            >
                {[
                    ['mingguan', 'Mingguan'],
                    ['bulanan', 'Bulanan'],
                ].map(([k, l]) => (
                    <button
                        key={k}
                        type="button"
                        role="tab"
                        aria-selected={mode === k}
                        onClick={() => ganti(k)}
                        className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${mode === k ? 'bg-surface text-teal-ink shadow-sm dark:bg-teal-deep dark:text-paper' : 'text-ink/75 hover:text-teal-ink'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            <section className="glass mt-4 rounded-3xl p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-teal-ink">
                        Pendapatan per {satuan}
                    </p>
                    <p className="text-sm text-ink/75">
                        Total {data.length} {satuan} terakhir:{' '}
                        <b className="text-teal-ink">{rupiah(total)}</b>
                    </p>
                </div>
                <div className="mt-5 flex gap-2 sm:gap-3">
                    {data.map((b, i) => (
                        <button
                            key={b.dari}
                            type="button"
                            aria-pressed={i === idx}
                            aria-label={`${b.penuh}: ${rupiah(b.pendapatan)}`}
                            onClick={() => setPilih(i)}
                            className="group flex flex-1 flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                        >
                            <span className="flex h-44 w-full flex-col justify-end">
                                <span
                                    className={`mb-1 text-center text-xs font-bold ${i === idx ? 'text-clay-ink' : 'text-ink/80'}`}
                                >
                                    {singkat(b.pendapatan)}
                                </span>
                                <span
                                    className={`w-full rounded-t-xl transition-all duration-500 ${i === idx ? 'bg-clay dark:bg-rose-deep' : 'bg-teal/60 group-hover:bg-teal/80'}`}
                                    style={{
                                        height: `${Math.max(3, (b.pendapatan / maks) * 82)}%`,
                                    }}
                                />
                            </span>
                            <span
                                className={`text-xs ${i === idx ? 'font-bold text-clay-ink' : 'font-medium text-ink/75'}`}
                            >
                                {b.label}
                            </span>
                        </button>
                    ))}
                </div>
                <p className="mt-4 text-center text-sm text-ink/70">
                    Ketuk batang untuk melihat rincian per {satuan}.
                </p>
            </section>

            <p className="mt-8 text-lg font-semibold text-teal-ink">{cur.penuh}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="rounded-3xl bg-clay p-4 text-white">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/15">
                        <Wallet size={17} />
                    </span>
                    <p className="mt-3 text-lg font-semibold">
                        {rupiah(cur.pendapatan)}
                    </p>
                    <p className="text-sm font-medium text-white">Pendapatan</p>
                    {delta !== null && (
                        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
                            {delta >= 0 ? (
                                <TrendingUp size={12} />
                            ) : (
                                <TrendingDown size={12} />
                            )}
                            {delta >= 0 ? '+' : ''}
                            {delta}% vs {satuan} lalu
                        </p>
                    )}
                </div>
                {[
                    [
                        ReceiptText,
                        'Transaksi',
                        `${cur.jumlah} sewa`,
                        cur.batal
                            ? `${cur.batal} dibatalkan`
                            : 'Tidak ada pembatalan',
                        'bg-teal/10 text-teal-ink',
                    ],
                    [
                        Wallet,
                        'Rata-rata per sewa',
                        rupiah(rata),
                        'Dari transaksi tidak batal',
                        'bg-rose-soft text-rose-deep',
                    ],
                    [
                        Trophy,
                        'Barang terlaris',
                        terlaris,
                        'Berdasarkan pendapatan',
                        'bg-sand text-teal-ink',
                    ],
                ].map(([Icon, l, v, sub, tone]) => (
                    <div key={l} className="glass rounded-3xl p-4">
                        <span
                            className={`grid size-9 place-items-center rounded-xl ${tone}`}
                        >
                            <Icon size={17} />
                        </span>
                        <p className="mt-3 line-clamp-1 text-lg font-semibold text-teal-ink">
                            {v}
                        </p>
                        <p className="text-sm font-medium text-ink/80">{l}</p>
                        <p className="mt-2 text-xs text-ink/70">{sub}</p>
                    </div>
                ))}
            </div>

            <section className="glass mt-6 overflow-hidden rounded-3xl">
                <div className="flex items-center justify-between px-5 py-4">
                    <p className="font-semibold text-teal-ink">
                        Rincian transaksi
                    </p>
                    <span className="text-sm text-ink/75">
                        {cur.rows.length} transaksi
                    </span>
                </div>
                {cur.rows.length === 0 ? (
                    <p className="px-5 pb-8 text-center text-sm text-ink/75">
                        Belum ada transaksi di {satuan} ini.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <thead className="bg-sand text-[13px] text-ink/85">
                                <tr>
                                    {[
                                        'Tanggal',
                                        'ID',
                                        'Barang',
                                        'Penyewa',
                                        'Durasi',
                                        'Total',
                                        'Status',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            scope="col"
                                            className={`px-5 py-2.5 font-semibold ${h === 'Total' ? 'text-right' : ''}`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ink/10">
                                {cur.rows.map((t) => (
                                    <tr
                                        key={t.id}
                                        className="transition hover:bg-surface/70"
                                    >
                                        <td className="px-5 py-3 whitespace-nowrap text-ink/85">
                                            {tglPanjang(t.tanggal)}
                                        </td>
                                        <td className="px-5 py-3 text-ink/75">
                                            {t.id}
                                        </td>
                                        <td className="px-5 py-3 font-medium">
                                            {bySlug(t.slug).name}
                                        </td>
                                        <td className="px-5 py-3">
                                            {t.penyewa}
                                        </td>
                                        <td className="px-5 py-3 whitespace-nowrap">
                                            {t.hari} hari
                                        </td>
                                        <td
                                            className={`px-5 py-3 text-right font-semibold whitespace-nowrap ${t.status === 'Dibatalkan' ? 'text-ink/55 line-through' : 'text-teal-ink'}`}
                                        >
                                            {rupiah(t.total)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <StatusBadge status={t.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-clay-soft/70">
                                    <td
                                        colSpan={5}
                                        className="px-5 py-3 font-semibold text-clay-ink"
                                    >
                                        Total pendapatan (tidak termasuk batal)
                                    </td>
                                    <td className="px-5 py-3 text-right font-bold whitespace-nowrap text-clay-ink">
                                        {rupiah(cur.pendapatan)}
                                    </td>
                                    <td />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </section>
        </AppShell>
    );
}
