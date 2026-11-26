// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Search } from 'lucide-react';
import { AppShell } from '@/layouts/shell';

const faq = [
    [
        'Bagaimana cara menyewa barang?',
        'Pilih barang, tentukan tanggal sewa, masukkan ke keranjang, lalu checkout. Mitra akan mengonfirmasi pesananmu.',
    ],
    [
        'Apa itu deposit dan kapan kembali?',
        'Deposit ditahan sistem selama masa sewa. Setelah barang dikembalikan dan dicek mitra, deposit kembali ke dompetmu.',
    ],
    [
        'Kenapa saya harus verifikasi identitas?',
        'Verifikasi dengan KTM dan selfie membuat transaksi lebih aman untuk penyewa maupun mitra. Cukup dilakukan sekali.',
    ],
    [
        'Bagaimana kalau pesanan saya dibatalkan mitra?',
        'Pembayaran dan deposit dikembalikan ke dompetmu. Kamu bisa mencari barang serupa dari mitra lain.',
    ],
    [
        'Barang terlambat dikembalikan, apa akibatnya?',
        'Status pesanan berubah menjadi Jatuh Tempo dan biaya tambahan per hari dihitung sesuai harga sewa barang.',
    ],
    [
        'Bagaimana cara menjadi mitra?',
        'Buka Mode mitra di profil, lalu tambahkan barangmu lengkap dengan harga dan tanggal tersedia.',
    ],
];

export default function Bantuan() {
    const [q, setQ] = useState('');
    const [buka, setBuka] = useState(null);
    const hasil = faq.filter(([t, j]) =>
        (t + j).toLowerCase().includes(q.trim().toLowerCase()),
    );

    return (
        <AppShell>
            <Head title="Pusat bantuan" />
            <div className="mx-auto max-w-2xl">
                <Link href="/profil" className="text-sm text-teal">
                    Kembali ke profil
                </Link>
                <h1 className="mt-3 text-2xl text-teal-ink sm:text-3xl">
                    Pusat bantuan
                </h1>
                <p className="mt-1 text-sm text-ink/60">
                    Pertanyaan yang paling sering ditanyakan.
                </p>

                <label className="mt-5 flex items-center gap-2.5 rounded-xl border border-ink/15 bg-surface px-4 py-3 transition duration-300 focus-within:border-teal focus-within:ring-4 focus-within:ring-teal/15">
                    <Search size={17} className="shrink-0 text-teal/70" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Cari pertanyaan"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35"
                    />
                </label>

                <div className="glass mt-4 divide-y divide-ink/5 overflow-hidden rounded-3xl">
                    {hasil.length === 0 && (
                        <p className="p-6 text-center text-sm text-ink/60">
                            Tidak ada pertanyaan yang cocok. Coba kata kunci
                            lain.
                        </p>
                    )}
                    {hasil.map(([t, j]) => {
                        const on = buka === t;
                        return (
                            <div key={t}>
                                <button
                                    onClick={() => setBuka(on ? null : t)}
                                    aria-expanded={on}
                                    className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-medium transition hover:bg-surface/60"
                                >
                                    <span className="flex-1">{t}</span>
                                    <ChevronDown
                                        size={17}
                                        className={`shrink-0 text-ink/40 transition duration-300 ${on ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {on && (
                                    <p className="px-5 pb-4 text-sm leading-relaxed text-ink/70">
                                        {j}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppShell>
    );
}
