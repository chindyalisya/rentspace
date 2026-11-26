// @ts-nocheck
import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PackagePlus, Pencil } from 'lucide-react';
import { btn, rupiah, Thumb } from '@/components/rs';
import { AppShell, MitraTabs } from '@/layouts/shell';
import { mitraItems } from '@/lib/dummy';

const tabs = [
    ['Semua', () => true],
    ['Aktif', (i) => i.status === 'Aktif'],
    ['Nonaktif', (i) => i.status === 'Nonaktif'],
    ['Sedang disewa', (i) => i.disewaHariIni],
];

export default function MitraBarang() {
    const [tab, setTab] = useState(0);
    const list = mitraItems.filter(tabs[tab][1]);
    return (
        <AppShell>
            <Head title="Barang saya" />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-teal-ink">
                    Barang saya
                </h1>
                <Link
                    href="/mitra/tambah-barang"
                    className={btn('primary', '!w-auto gap-2 px-5')}
                >
                    <PackagePlus size={16} />
                    Tambah barang
                </Link>
            </div>
            <MitraTabs active="/mitra/barang" />
            <div className="mt-5 flex gap-2 overflow-x-auto">
                {tabs.map(([l], n) => (
                    <button
                        key={l}
                        onClick={() => setTab(n)}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${tab === n ? 'bg-teal-deep text-paper shadow-sm' : 'glass text-ink/70'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((it) => (
                    <div key={it.slug} className="glass rounded-3xl p-4">
                        <div className="flex items-start gap-3">
                            <Thumb
                                item={it}
                                zoom={false}
                                className="size-14 rounded-xl"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate font-medium">
                                    {it.name}
                                </p>
                                <p className="text-sm text-teal">
                                    {rupiah(it.price)}
                                    <span className="text-xs text-ink/50">
                                        /hari
                                    </span>
                                </p>
                                <span
                                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${it.status === 'Aktif' ? 'bg-teal/10 text-teal-ink' : 'bg-ink/8 text-ink/50'}`}
                                >
                                    {it.disewaHariIni
                                        ? 'Sedang disewa'
                                        : it.status}
                                </span>
                            </div>
                        </div>
                        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-surface/70 py-2 text-sm font-medium text-teal-ink transition hover:bg-surface">
                            <Pencil size={14} />
                            Edit barang
                        </button>
                    </div>
                ))}
                {!list.length && (
                    <p className="text-sm text-ink/55">
                        Tidak ada barang di kategori ini.
                    </p>
                )}
            </div>
        </AppShell>
    );
}
