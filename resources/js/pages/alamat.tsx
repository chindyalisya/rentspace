// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AppShell } from '@/layouts/shell';

/* Dummy sampai backend alamat siap */
const awal = [
    {
        id: 1,
        label: 'Kos',
        penerima: 'Chindy Alieisya',
        detail: 'Jl. Sekaran Raya, Gunungpati, Semarang',
    },
    {
        id: 2,
        label: 'Kampus',
        penerima: 'Chindy Alieisya',
        detail: 'Kampus UNNES Sekaran, Gunungpati, Semarang',
    },
];

export default function Alamat() {
    const [list, setList] = useState(awal);
    const [utama, setUtama] = useState(1);
    const [buka, setBuka] = useState(false);
    const [f, setF] = useState({ label: '', penerima: '', detail: '' });
    const siap = f.label.trim() && f.penerima.trim() && f.detail.trim();

    const simpan = (e) => {
        e.preventDefault();
        if (!siap) return;
        const id = Date.now();
        setList([...list, { id, ...f }]);
        if (list.length === 0) setUtama(id);
        setF({ label: '', penerima: '', detail: '' });
        setBuka(false);
    };
    const hapus = (id) => {
        const sisa = list.filter((a) => a.id !== id);
        setList(sisa);
        if (utama === id) setUtama(sisa[0]?.id ?? null);
    };

    return (
        <AppShell>
            <Head title="Alamat tersimpan" />
            <div className="mx-auto max-w-2xl">
                <Link href="/profil" className="text-sm text-teal">
                    Kembali ke profil
                </Link>
                <h1 className="mt-3 text-2xl text-teal-ink sm:text-3xl">
                    Alamat tersimpan
                </h1>
                <p className="mt-1 text-sm text-ink/60">
                    Dipakai saat barang diantar ke tempatmu.
                </p>

                <div className="mt-5 space-y-3">
                    {list.length === 0 && (
                        <div className="glass rounded-3xl p-6 text-center text-sm text-ink/60">
                            Belum ada alamat. Tambahkan alamat pertamamu.
                        </div>
                    )}
                    {list.map((a) => (
                        <div
                            key={a.id}
                            className="glass flex items-start gap-3 rounded-3xl p-5"
                        >
                            <MapPin
                                size={18}
                                className="mt-0.5 shrink-0 text-teal"
                            />
                            <div className="flex-1">
                                <p className="flex items-center gap-2 text-sm font-semibold">
                                    {a.label}
                                    {utama === a.id && (
                                        <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                                            Utama
                                        </span>
                                    )}
                                </p>
                                <p className="mt-0.5 text-xs text-ink/55">
                                    {a.penerima}
                                </p>
                                <p className="mt-1 text-sm leading-relaxed text-ink/80">
                                    {a.detail}
                                </p>
                                {utama !== a.id && (
                                    <button
                                        onClick={() => setUtama(a.id)}
                                        className="mt-2 text-xs font-medium text-teal"
                                    >
                                        Jadikan utama
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => hapus(a.id)}
                                aria-label={`Hapus alamat ${a.label}`}
                                className="text-ink/40 transition hover:text-rose-deep"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>
                    ))}
                </div>

                {buka ? (
                    <form
                        onSubmit={simpan}
                        className="glass mt-4 space-y-4 rounded-3xl p-5"
                    >
                        <Field
                            label="Nama alamat"
                            placeholder="Contoh: Rumah"
                            value={f.label}
                            onChange={(e) =>
                                setF({ ...f, label: e.target.value })
                            }
                        />
                        <Field
                            label="Nama penerima"
                            value={f.penerima}
                            onChange={(e) =>
                                setF({ ...f, penerima: e.target.value })
                            }
                        />
                        <Field
                            label="Alamat lengkap"
                            placeholder="Jalan, nomor, kecamatan, kota"
                            value={f.detail}
                            onChange={(e) =>
                                setF({ ...f, detail: e.target.value })
                            }
                        />
                        <div className="flex gap-3">
                            <Button type="submit" disabled={!siap}>
                                Simpan alamat
                            </Button>
                            <Button
                                type="button"
                                variant="soft"
                                onClick={() => setBuka(false)}
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setBuka(true)}
                        className="glass mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium text-teal-ink transition hover:bg-surface/80"
                    >
                        <Plus size={17} />
                        Tambah alamat
                    </button>
                )}
            </div>
        </AppShell>
    );
}
