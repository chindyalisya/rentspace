// @ts-nocheck
import { Head, router } from '@inertiajs/react';

export default function AdminVerifikasi({ items }) {
    const review = (id, status) => {
        let alasan = null;
        if (status === 'rejected') {
            alasan = window.prompt('Alasan penolakan:');
            if (alasan === null) return;
        }
        router.patch(
            `/admin/verifikasi/${id}`,
            { status, alasan },
            { preserveScroll: true },
        );
    };

    return (
        <div className="mx-auto max-w-4xl space-y-4 p-6">
            <Head title="Pengajuan verifikasi" />
            <h1 className="text-2xl font-semibold">Pengajuan verifikasi</h1>
            {items.length === 0 && <p>Belum ada pengajuan.</p>}
            {items.map((it) => (
                <div key={it.id} className="flex flex-wrap gap-4 rounded-xl border p-4">
                    {['ktm', 'selfie'].map((j) => (
                        <a key={j} href={`/admin/verifikasi/${it.id}/foto/${j}`} target="_blank" rel="noreferrer">
                            <img
                                src={`/admin/verifikasi/${it.id}/foto/${j}`}
                                alt={j}
                                className="h-28 w-40 rounded object-cover"
                            />
                        </a>
                    ))}
                    <div className="min-w-48 flex-1">
                        <p className="font-medium">{it.user.name}</p>
                        <p className="text-sm text-gray-500">{it.user.email}</p>
                        <p className="text-sm">
                            Status: <b>{it.status}</b>
                            {it.alasan && ` — ${it.alasan}`}
                        </p>
                    </div>
                    {it.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                            <button onClick={() => review(it.id, 'approved')}>Setujui</button>
                            <button onClick={() => review(it.id, 'rejected')}>Tolak</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}