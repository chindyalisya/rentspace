// @ts-nocheck
import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Hourglass } from 'lucide-react';
import { DocTypeToggle, UploadBox } from '@/components/identity-upload';
import { Button, btn } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';

/* status dari controller: none | pending | approved | rejected */
export default function Verifikasi({ status = 'none', reason = null }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        jenis: 'ktm',
        ktm: null,
        selfie: null,
    });

    if (status === 'approved') {
        return (
            <AuthShell
                title="Identitas terverifikasi"
                subtitle="Akunmu sudah terverifikasi. Selamat menyewa!"
            >
                <Head title="Terverifikasi" />
                <Link href="/home" className={btn('primary')}>
                    Mulai sewa
                </Link>
            </AuthShell>
        );
    }

    if (status === 'pending') {
        return (
            <AuthShell
                title="Menunggu verifikasi"
                subtitle="Biasanya selesai dalam 1x24 jam. Kami kabari lewat notifikasi."
            >
                <Head title="Menunggu verifikasi" />
                <Hourglass size={48} className="mx-auto mb-6 text-rose-deep" />
                <Link href="/home" className={btn('primary')}>
                    Lihat-lihat dulu
                </Link>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Verifikasi identitas"
            subtitle="Bikin RentSpace lebih aman buat kamu dan mitra. Cuma sekali di awal."
        >
            <Head title="Verifikasi identitas" />
            {status === 'rejected' && reason && (
                <p className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-700 dark:bg-red-400/15 dark:text-red-300">
                    Verifikasi ditolak: {reason}. Upload ulang ya.
                </p>
            )}
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-ink/70">
                <span>
                    Langkah {step} dari 2:{' '}
                    {step === 1
                        ? `Foto ${data.jenis.toUpperCase()}`
                        : 'Foto selfie'}
                </span>
                <span className="ml-auto flex gap-1.5">
                    {[1, 2].map((n) => (
                        <span
                            key={n}
                            className={`h-1.5 w-8 rounded-full ${n <= step ? 'bg-teal' : 'bg-teal/20'}`}
                        />
                    ))}
                </span>
            </div>
            {step === 1 && (
                <DocTypeToggle
                    value={data.jenis}
                    onChange={(v) => setData('jenis', v)}
                />
            )}
            {step === 1 ? (
                <UploadBox
                    label="Ambil foto atau pilih dari galeri"
                    hint={`Foto ${data.jenis.toUpperCase()} harus jelas, tidak buram, dan semua sisi terlihat.`}
                    file={data.ktm}
                    onFile={(f) => setData('ktm', f)}
                />
            ) : (
                <UploadBox
                    selfie
                    label="Selfie"
                    hint="Wajah terlihat jelas dengan pencahayaan cukup."
                    file={data.selfie}
                    onFile={(f) => setData('selfie', f)}
                />
            )}
            {(errors.jenis || errors.ktm || errors.selfie) && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {errors.jenis || errors.ktm || errors.selfie}
                </p>
            )}
            <div className="mt-7 space-y-3">
                {step === 1 ? (
                    <Button disabled={!data.ktm} onClick={() => setStep(2)}>
                        Lanjut
                    </Button>
                ) : (
                    <>
                        <Button
                            disabled={!data.selfie || processing}
                            onClick={() =>
                                post('/verifikasi', { forceFormData: true })
                            }
                        >
                            {processing ? 'Mengirim…' : 'Kirim verifikasi'}
                        </Button>
                        <Button variant="soft" onClick={() => setStep(1)}>
                            Kembali
                        </Button>
                    </>
                )}
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-center text-xs font-medium text-ink/55"
                >
                    Keluar
                </Link>
            </div>
        </AuthShell>
    );
}
