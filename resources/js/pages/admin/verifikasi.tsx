// @ts-nocheck
import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Check, ShieldCheck, X } from 'lucide-react';
import { AdminShell } from '@/layouts/shell';

const tabs = [
    ['pending', 'Menunggu'],
    ['approved', 'Disetujui'],
    ['rejected', 'Ditolak'],
    ['all', 'Semua'],
];

const statusUi = {
    pending: ['Menunggu', 'bg-amber-100 text-amber-800'],
    approved: ['Disetujui', 'bg-emerald-100 text-emerald-800'],
    rejected: ['Ditolak', 'bg-red-100 text-red-700'],
};

const tanggal = (v) =>
    v
        ? new Date(v).toLocaleString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : '-';

const base =
    'inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-300 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50';
const btnApprove = `${base} bg-teal-deep text-cream shadow-sm hover:bg-teal`;
const btnReject = `${base} border border-rose-deep/30 text-rose-deep hover:bg-rose-soft`;
const btnDanger = `${base} bg-rose-deep text-white shadow-sm hover:bg-[#a96a5f]`;
const btnGhost = `${base} text-ink/60 hover:bg-white/80`;

function Foto({ id, jenis, label, className, onOpen }) {
    const src = `/admin/verifikasi/${id}/foto/${jenis}`;
    return (
        <button
            type="button"
            onClick={() => onOpen({ src, label })}
            aria-label={`Perbesar ${label}`}
            className={`group relative shrink-0 overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/10 ${className}`}
        >
            <img
                src={src}
                alt={label}
                loading="lazy"
                className="size-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent px-2 pt-4 pb-1.5 text-left text-[10px] font-semibold text-white">
                {label}
            </span>
        </button>
    );
}

export default function AdminVerifikasi({ items = [] }) {
    const [tab, setTab] = useState('pending');
    const [foto, setFoto] = useState(null);
    const [rejecting, setRejecting] = useState(null);
    const [alasan, setAlasan] = useState('');
    const [busy, setBusy] = useState(null);

    useEffect(() => {
        if (!foto) return;
        const esc = (e) => e.key === 'Escape' && setFoto(null);
        window.addEventListener('keydown', esc);
        return () => window.removeEventListener('keydown', esc);
    }, [foto]);

    const count = (k) =>
        k === 'all' ? items.length : items.filter((i) => i.status === k).length;
    const list = tab === 'all' ? items : items.filter((i) => i.status === tab);

    const review = (id, status, alasanTolak = null) =>
        router.patch(
            `/admin/verifikasi/${id}`,
            { status, alasan: alasanTolak },
            {
                preserveScroll: true,
                onStart: () => setBusy(id),
                onFinish: () => setBusy(null),
                onSuccess: () => {
                    setRejecting(null);
                    setAlasan('');
                },
            },
        );

    return (
        <AdminShell>
            <Head title="Verifikasi identitas" />
            <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-teal/10 text-teal-deep">
                    <ShieldCheck size={22} />
                </span>
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">
                        Verifikasi identitas
                    </h1>
                    <p className="text-sm text-ink/60">
                        Periksa KTM atau KTP dan selfie, lalu setujui atau tolak
                        pengajuan.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                {tabs.map(([k, l]) => (
                    <button
                        key={k}
                        type="button"
                        onClick={() => setTab(k)}
                        className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${tab === k ? 'bg-teal-deep text-cream shadow-sm' : 'glass text-ink/70 hover:bg-white'}`}
                    >
                        {l}
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs ${tab === k ? 'bg-white/20' : 'bg-ink/5'}`}
                        >
                            {count(k)}
                        </span>
                    </button>
                ))}
            </div>

            <div className="mt-5 space-y-4">
                {list.length === 0 && (
                    <div className="glass rounded-3xl p-10 text-center">
                        <p className="font-medium text-teal-deep">
                            Tidak ada pengajuan di sini.
                        </p>
                        <p className="mt-1 text-sm text-ink/55">
                            Pengajuan baru akan muncul otomatis saat mahasiswa
                            mendaftar.
                        </p>
                    </div>
                )}

                {list.map((it) => {
                    const [label, cls] =
                        statusUi[it.status] ?? statusUi.pending;
                    const jenis = (it.jenis_dokumen ?? 'ktm').toUpperCase();
                    return (
                        <article
                            key={it.id}
                            className="glass rounded-3xl p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="flex gap-3">
                                    <Foto
                                        id={it.id}
                                        jenis="ktm"
                                        label={jenis}
                                        onOpen={setFoto}
                                        className="h-28 w-44 sm:h-32 sm:w-48"
                                    />
                                    <Foto
                                        id={it.id}
                                        jenis="selfie"
                                        label="Selfie"
                                        onOpen={setFoto}
                                        className="size-28 sm:size-32"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="truncate text-lg font-semibold text-teal-deep">
                                            {it.user?.name}
                                        </p>
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
                                        >
                                            {label}
                                        </span>
                                        <span className="rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal-deep">
                                            {jenis}
                                        </span>
                                    </div>
                                    <p className="truncate text-sm text-ink/60">
                                        {it.user?.email}
                                    </p>
                                    <p className="mt-2 text-xs text-ink/50">
                                        Dikirim {tanggal(it.created_at)}
                                        {it.diperiksa_at &&
                                            ` · Diperiksa ${tanggal(it.diperiksa_at)}`}
                                    </p>
                                    {it.status === 'rejected' && it.alasan && (
                                        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
                                            Alasan penolakan: {it.alasan}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {it.status === 'pending' &&
                                (rejecting === it.id ? (
                                    <div className="mt-4 border-t border-ink/10 pt-4">
                                        <label
                                            htmlFor={`alasan-${it.id}`}
                                            className="mb-1.5 block text-xs font-semibold text-ink/70"
                                        >
                                            Alasan penolakan
                                        </label>
                                        <textarea
                                            id={`alasan-${it.id}`}
                                            rows={2}
                                            autoFocus
                                            value={alasan}
                                            onChange={(e) =>
                                                setAlasan(e.target.value)
                                            }
                                            placeholder="Contoh: foto KTM buram, mohon upload ulang"
                                            className="w-full rounded-xl border border-ink/15 bg-white p-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-teal focus:ring-4 focus:ring-teal/15"
                                        />
                                        <div className="mt-3 flex flex-wrap justify-end gap-2">
                                            <button
                                                type="button"
                                                className={btnGhost}
                                                onClick={() => {
                                                    setRejecting(null);
                                                    setAlasan('');
                                                }}
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="button"
                                                className={btnDanger}
                                                disabled={
                                                    alasan.trim().length < 3 ||
                                                    busy === it.id
                                                }
                                                onClick={() =>
                                                    review(
                                                        it.id,
                                                        'rejected',
                                                        alasan.trim(),
                                                    )
                                                }
                                            >
                                                <X size={16} />
                                                Kirim penolakan
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-ink/10 pt-4">
                                        <button
                                            type="button"
                                            className={btnReject}
                                            disabled={busy === it.id}
                                            onClick={() => {
                                                setRejecting(it.id);
                                                setAlasan('');
                                            }}
                                        >
                                            <X size={16} />
                                            Tolak
                                        </button>
                                        <button
                                            type="button"
                                            className={btnApprove}
                                            disabled={busy === it.id}
                                            onClick={() =>
                                                review(it.id, 'approved')
                                            }
                                        >
                                            <Check size={16} />
                                            Setujui
                                        </button>
                                    </div>
                                ))}
                        </article>
                    );
                })}
            </div>

            {foto && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={foto.label}
                    onClick={() => setFoto(null)}
                    className="fixed inset-0 z-50 grid place-items-center bg-ink/75 p-4 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        aria-label="Tutup"
                        onClick={() => setFoto(null)}
                        className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    >
                        <X size={20} />
                    </button>
                    <img
                        src={foto.src}
                        alt={foto.label}
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[85vh] max-w-full rounded-2xl bg-white object-contain shadow-2xl"
                    />
                </div>
            )}
        </AdminShell>
    );
}
