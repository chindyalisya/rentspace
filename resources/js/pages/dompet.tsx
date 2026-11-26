// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Button, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';

/* Dummy sampai backend dompet siap */
const riwayatAwal = [
    { id: 4, ket: 'Deposit ditahan RS-1042', nilai: -150000, tgl: '23 Sep' },
    { id: 3, ket: 'Deposit kembali RS-1039', nilai: 100000, tgl: '16 Sep' },
    { id: 2, ket: 'Deposit ditahan RS-1039', nilai: -100000, tgl: '12 Sep' },
    { id: 1, ket: 'Isi saldo', nilai: 500000, tgl: '10 Sep' },
];
const pilihan = [50000, 100000, 250000];

export default function Dompet() {
    const [saldo, setSaldo] = useState(350000);
    const [riwayat, setRiwayat] = useState(riwayatAwal);
    const deposit = 150000;

    const isi = (n) => {
        setSaldo(saldo + n);
        setRiwayat([
            { id: Date.now(), ket: 'Isi saldo', nilai: n, tgl: 'Hari ini' },
            ...riwayat,
        ]);
    };

    return (
        <AppShell>
            <Head title="Dompet dan deposit" />
            <div className="mx-auto max-w-2xl">
                <Link href="/profil" className="text-sm text-teal">
                    Kembali ke profil
                </Link>
                <h1 className="mt-3 text-2xl text-teal-ink sm:text-3xl">
                    Dompet dan deposit
                </h1>

                <div className="relative mt-5 overflow-hidden rounded-3xl bg-clay p-6 text-white sm:p-8">
                    <span className="pointer-events-none absolute -top-12 -right-10 size-48 rounded-full border-[22px] border-white/10" />
                    <span className="pointer-events-none absolute -right-2 -bottom-16 size-40 rounded-full border-[18px] border-white/10" />
                    <p className="relative text-sm text-white/90">
                        Saldo tersedia
                    </p>
                    <p className="relative mt-1 font-display text-4xl font-semibold">
                        {rupiah(saldo)}
                    </p>
                    <p className="relative mt-4 flex items-center gap-2 text-xs text-white/90">
                        <ShieldCheck size={15} />
                        Deposit ditahan {rupiah(deposit)}, kembali setelah
                        barang dikembalikan.
                    </p>
                </div>

                <div className="glass mt-4 rounded-3xl p-5">
                    <p className="text-sm font-semibold">Isi saldo</p>
                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {pilihan.map((n) => (
                            <Button
                                key={n}
                                variant="soft"
                                onClick={() => isi(n)}
                            >
                                {rupiah(n)}
                            </Button>
                        ))}
                    </div>
                </div>

                <h2 className="mt-8 text-lg text-teal-ink">Riwayat</h2>
                <div className="glass mt-3 divide-y divide-ink/5 overflow-hidden rounded-3xl">
                    {riwayat.map((r) => (
                        <div
                            key={r.id}
                            className="flex items-center gap-3 px-5 py-4"
                        >
                            <span
                                className={`grid size-9 place-items-center rounded-full ${r.nilai > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300' : 'bg-neutral-200/80 text-neutral-700 dark:bg-white/10 dark:text-neutral-300'}`}
                            >
                                {r.nilai > 0 ? (
                                    <ArrowDownLeft size={16} />
                                ) : (
                                    <ArrowUpRight size={16} />
                                )}
                            </span>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{r.ket}</p>
                                <p className="text-xs text-ink/50">{r.tgl}</p>
                            </div>
                            <p
                                className={`text-sm font-semibold ${r.nilai > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-ink'}`}
                            >
                                {r.nilai > 0 ? '+' : '-'}
                                {rupiah(Math.abs(r.nilai))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
