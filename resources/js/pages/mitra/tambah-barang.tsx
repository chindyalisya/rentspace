// @ts-nocheck
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { CheckCircle2, ImagePlus } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import { cats } from '@/lib/dummy';

const stepLabel = [
    'Info dasar',
    'Foto barang',
    'Harga & durasi',
    'Deposit & syarat',
];

export default function TambahBarang() {
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false);
    const [f, setF] = useState({
        nama: '',
        kategori: 'alat-camping',
        deskripsi: '',
        foto: [],
        harga: '',
        minHari: '1',
        deposit: '',
        syarat: '',
    });
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
    const next = () => setStep((s) => Math.min(4, s + 1));
    const back = () => setStep((s) => Math.max(1, s - 1));
    const submit = () => setDone(true); // TODO: POST ke backend

    if (done) {
        return (
            <AppShell>
                <Head title="Barang ditambahkan" />
                <div className="glass mx-auto mt-8 grid max-w-md place-items-center rounded-3xl p-10 text-center">
                    <CheckCircle2 size={48} className="text-teal" />
                    <h1 className="mt-4 text-2xl font-semibold text-teal-deep">
                        Barang berhasil ditambahkan
                    </h1>
                    <p className="mt-1 text-sm text-ink/60">
                        {f.nama || 'Barangmu'} sudah tampil di katalog dan siap
                        disewa.
                    </p>
                    <button
                        onClick={() => router.visit('/mitra/barang')}
                        className="mt-7 rounded-2xl bg-teal-deep px-6 py-3 text-sm font-medium text-white"
                    >
                        Lihat barang saya
                    </button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="Tambah barang" />
            <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">
                Tambah barang
            </h1>
            <MitraTabs active="/mitra/tambah-barang" />

            <div className="mt-6 flex items-center gap-2">
                {stepLabel.map((l, i) => (
                    <div key={l} className="flex flex-1 items-center gap-2">
                        <span
                            className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-medium ${step > i ? 'bg-teal-deep text-cream' : step === i + 1 ? 'bg-teal/15 text-teal-deep ring-2 ring-teal/30' : 'bg-ink/8 text-ink/40'}`}
                        >
                            {i + 1}
                        </span>
                        <span
                            className={`hidden text-xs sm:block ${step === i + 1 ? 'font-medium text-teal-deep' : 'text-ink/45'}`}
                        >
                            {l}
                        </span>
                        {i < 3 && (
                            <span
                                className={`h-px flex-1 ${step > i + 1 ? 'bg-teal/50' : 'bg-ink/10'}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="glass mt-6 rounded-3xl p-6 sm:p-8">
                {step === 1 && (
                    <div className="space-y-4">
                        <Field
                            label="Nama barang"
                            placeholder="Contoh: Canon EOS 30D"
                            value={f.nama}
                            onChange={set('nama')}
                        />
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                                Kategori
                            </span>
                            <select
                                value={f.kategori}
                                onChange={set('kategori')}
                                className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                            >
                                {cats
                                    .filter(([s]) => s !== 'semua')
                                    .map(([v, l]) => (
                                        <option key={v} value={v}>
                                            {l}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                                Deskripsi
                            </span>
                            <textarea
                                rows={4}
                                value={f.deskripsi}
                                onChange={set('deskripsi')}
                                placeholder="Kondisi barang, kelengkapan, dan hal yang perlu diketahui penyewa"
                                className="w-full rounded-2xl border border-white/80 bg-white/70 p-4 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                            />
                        </label>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <p className="text-sm text-ink/60">
                            Unggah minimal 1 foto. Foto pertama jadi sampul di
                            katalog.
                        </p>
                        <label className="mt-4 flex h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-teal/30 bg-white/50 text-ink/50 transition hover:bg-white/70">
                            <ImagePlus size={28} className="text-teal" />
                            <span className="text-sm">
                                Tap untuk pilih foto
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) =>
                                    setF({ ...f, foto: [...e.target.files] })
                                }
                            />
                        </label>
                        {f.foto.length > 0 && (
                            <p className="mt-2 text-xs text-teal-deep">
                                {f.foto.length} foto dipilih
                            </p>
                        )}
                    </div>
                )}
                {step === 3 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Harga sewa per hari (Rp)"
                            type="number"
                            placeholder="50000"
                            value={f.harga}
                            onChange={set('harga')}
                        />
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                                Minimal hari sewa
                            </span>
                            <select
                                value={f.minHari}
                                onChange={set('minHari')}
                                className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                            >
                                {[1, 2, 3].map((n) => (
                                    <option key={n} value={n}>
                                        {n} hari
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
                {step === 4 && (
                    <div className="space-y-4">
                        <Field
                            label="Deposit (dikembalikan penuh)"
                            type="number"
                            placeholder="100000"
                            value={f.deposit}
                            onChange={set('deposit')}
                        />
                        <label className="block">
                            <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                                Syarat tambahan (opsional)
                            </span>
                            <textarea
                                rows={3}
                                value={f.syarat}
                                onChange={set('syarat')}
                                placeholder="Contoh: wajib kembalikan dengan baterai penuh"
                                className="w-full rounded-2xl border border-white/80 bg-white/70 p-4 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                            />
                        </label>
                    </div>
                )}

                <div className="mt-7 flex gap-3">
                    {step > 1 && (
                        <Button variant="soft" onClick={back}>
                            Kembali
                        </Button>
                    )}
                    {step < 4 ? (
                        <Button onClick={next} disabled={step === 1 && !f.nama}>
                            Lanjut
                        </Button>
                    ) : (
                        <Button
                            onClick={submit}
                            disabled={!f.harga || !f.deposit}
                        >
                            Simpan barang
                        </Button>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
