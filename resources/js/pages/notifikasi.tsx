// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BadgeCheck,
    BellOff,
    CircleAlert,
    Hourglass,
    ReceiptText,
    ShieldAlert,
    Wallet,
} from 'lucide-react';
import { AppShell } from '@/layouts/shell';

/* Notifikasi verifikasi memakai status asli dari server. Sisanya dummy sampai backend pesanan siap. */
function notifVerifikasi(v) {
    if (!v)
        return {
            id: 'v',
            Icon: ShieldAlert,
            tone: 'bg-clay-soft text-clay',
            judul: 'Lengkapi verifikasi identitas',
            isi: 'Kirim KTM atau KTP dan selfie agar bisa menyewa dan menyewakan barang.',
            tautan: ['/verifikasi', 'Verifikasi sekarang'],
            baru: true,
        };
    if (v.status === 'approved')
        return {
            id: 'v',
            Icon: BadgeCheck,
            tone: 'bg-emerald-100 text-emerald-800',
            judul: 'Identitas kamu sudah terverifikasi',
            isi: 'Sekarang kamu bisa checkout dan membuka mode mitra.',
            baru: true,
        };
    if (v.status === 'rejected')
        return {
            id: 'v',
            Icon: CircleAlert,
            tone: 'bg-red-100 text-red-700',
            judul: 'Verifikasi identitas ditolak',
            isi: v.alasan
                ? `Alasan: ${v.alasan}`
                : 'Foto dokumen belum memenuhi syarat.',
            tautan: ['/verifikasi', 'Kirim ulang'],
            baru: true,
        };
    return {
        id: 'v',
        Icon: Hourglass,
        tone: 'bg-amber-100 text-amber-800',
        judul: 'Verifikasi identitas sedang ditinjau',
        isi: 'Biasanya selesai dalam 1x24 jam. Kamu tetap bisa melihat-lihat barang.',
        baru: false,
    };
}

const dummy = [
    {
        id: 'n1',
        Icon: ReceiptText,
        tone: 'bg-teal/10 text-teal-deep',
        judul: 'Sewa RS-1042 sedang berjalan',
        isi: 'Kembalikan Carrier Eiger 45L sebelum 26 Sep agar deposit kembali utuh.',
        tautan: ['/pesanan', 'Lihat pesanan'],
        baru: true,
        waktu: 'Hari ini',
    },
    {
        id: 'n2',
        Icon: ReceiptText,
        tone: 'bg-sand text-teal-deep',
        judul: 'RS-1051 menunggu konfirmasi mitra',
        isi: 'Pemilik barang akan menanggapi dalam 1x24 jam.',
        baru: false,
        waktu: 'Kemarin',
    },
    {
        id: 'n3',
        Icon: Wallet,
        tone: 'bg-rose-soft text-rose-deep',
        judul: 'Deposit RS-1039 sudah kembali',
        isi: 'Saldo dompetmu bertambah Rp100.000.',
        tautan: ['/dompet', 'Buka dompet'],
        baru: false,
        waktu: '16 Sep',
    },
];

export default function Notifikasi({ verifikasi = null }) {
    const [dibaca, setDibaca] = useState([]);
    const daftar = [
        { ...notifVerifikasi(verifikasi), waktu: 'Status terbaru' },
        ...dummy,
    ];
    const baru = daftar.filter((n) => n.baru && !dibaca.includes(n.id)).length;

    return (
        <AppShell>
            <Head title="Notifikasi" />
            <div className="mx-auto max-w-2xl">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">
                            Notifikasi
                        </h1>
                        <p className="mt-1 text-sm text-ink/60">
                            {baru
                                ? `${baru} belum dibaca`
                                : 'Semua sudah dibaca'}
                        </p>
                    </div>
                    {baru > 0 && (
                        <button
                            type="button"
                            onClick={() => setDibaca(daftar.map((n) => n.id))}
                            className="text-sm font-semibold text-teal transition hover:text-teal-deep"
                        >
                            Tandai semua dibaca
                        </button>
                    )}
                </div>

                {daftar.length === 0 ? (
                    <div className="glass mt-6 grid place-items-center rounded-3xl px-6 py-16 text-center">
                        <BellOff size={34} className="text-rose-deep/60" />
                        <p className="mt-3 font-medium">Belum ada notifikasi</p>
                    </div>
                ) : (
                    <ul className="glass mt-6 divide-y divide-ink/5 overflow-hidden rounded-3xl">
                        {daftar.map(
                            ({
                                id,
                                Icon,
                                tone,
                                judul,
                                isi,
                                tautan,
                                baru: b,
                                waktu,
                            }) => {
                                const belumBaca = b && !dibaca.includes(id);
                                return (
                                    <li
                                        key={id}
                                        className={`flex gap-4 px-5 py-4 ${belumBaca ? 'bg-clay-soft/40' : ''}`}
                                    >
                                        <span
                                            className={`grid size-10 shrink-0 place-items-center rounded-2xl ${tone}`}
                                        >
                                            <Icon size={18} />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <p className="text-sm font-semibold text-teal-deep">
                                                    {judul}
                                                </p>
                                                {belumBaca && (
                                                    <span
                                                        aria-label="Belum dibaca"
                                                        className="mt-1.5 size-2 shrink-0 rounded-full bg-clay"
                                                    />
                                                )}
                                            </div>
                                            <p className="mt-0.5 text-sm text-ink/65">
                                                {isi}
                                            </p>
                                            <div className="mt-2 flex items-center gap-3 text-xs">
                                                <span className="text-ink/45">
                                                    {waktu}
                                                </span>
                                                {tautan && (
                                                    <Link
                                                        href={tautan[0]}
                                                        className="font-semibold text-clay transition hover:text-clay-deep"
                                                    >
                                                        {tautan[1]}
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                )}
            </div>
        </AppShell>
    );
}
