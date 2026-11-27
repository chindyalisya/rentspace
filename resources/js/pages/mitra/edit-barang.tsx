// @ts-nocheck
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Field, Thumb } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import { bySlug } from '@/lib/dummy';

export default function EditBarang({ slug, aktif = true }) {
    const it = bySlug(slug);
    const [f, setF] = useState({
        nama: it.name,
        harga: String(it.price),
        deposit: String(it.deposit),
        deskripsi: it.desc ?? '',
        aktif,
    });
    const [err, setErr] = useState({});
    const [busy, setBusy] = useState(false);
    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

    const simpan = () => {
        setBusy(true);
        setErr({});
        router.patch(
            `/mitra/barang/${slug}`,
            {
                ...f,
                harga: Number(f.harga),
                deposit: Number(f.deposit),
            },
            {
                onError: (e) => setErr(e),
                onFinish: () => setBusy(false),
            },
        );
    };

    const msg = (k) =>
        err[k] && <p className="mt-1 text-xs text-red-600">{err[k]}</p>;

    return (
        <AppShell>
            <Head title={`Edit ${it.name}`} />
            <h1 className="text-3xl font-semibold tracking-tight text-teal-ink">
                Edit barang
            </h1>
            <MitraTabs active="/mitra/barang" />

            <div className="glass mt-6 max-w-2xl rounded-3xl p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <Thumb
                        item={it}
                        zoom={false}
                        className="size-14 rounded-xl"
                    />
                    <p className="font-medium">{it.name}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Field
                            label="Nama barang"
                            value={f.nama}
                            onChange={set('nama')}
                            error={err.nama}
                        />
                        {msg('nama')}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Field
                                label="Harga sewa per hari (Rp)"
                                type="number"
                                min="1000"
                                value={f.harga}
                                onChange={set('harga')}
                                error={err.harga}
                            />
                            {msg('harga')}
                        </div>
                        <div>
                            <Field
                                label="Deposit (Rp)"
                                type="number"
                                min="0"
                                value={f.deposit}
                                onChange={set('deposit')}
                                error={err.deposit}
                            />
                            {msg('deposit')}
                        </div>
                    </div>
                    <label className="block">
                        <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                            Deskripsi
                        </span>
                        <textarea
                            rows={4}
                            value={f.deskripsi}
                            onChange={set('deskripsi')}
                            className="w-full rounded-2xl border border-ink/10 bg-surface/70 p-4 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                        />
                        {msg('deskripsi')}
                    </label>
                    <div>
                        <span className="mb-1.5 block text-xs font-semibold text-ink/70">
                            Status
                        </span>
                        <div className="flex gap-2">
                            {[
                                [true, 'Aktif'],
                                [false, 'Nonaktif'],
                            ].map(([v, l]) => (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setF({ ...f, aktif: v })}
                                    className={`rounded-full px-4 py-2 text-sm font-medium ${f.aktif === v ? 'bg-teal-deep text-paper shadow-sm' : 'glass text-ink/70'}`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-ink/55">
                            Barang nonaktif disembunyikan dari katalog dan tidak
                            bisa disewa.
                        </p>
                    </div>
                </div>

                <div className="mt-7 flex items-center gap-3">
                    <Button disabled={busy} onClick={simpan}>
                        {busy ? 'Menyimpan...' : 'Simpan perubahan'}
                    </Button>
                    <Link
                        href="/mitra/barang"
                        className="text-sm font-medium text-ink/60 hover:text-teal-ink"
                    >
                        Batal
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}
