// @ts-nocheck
import { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Camera, Hourglass } from 'lucide-react';
import { Button, btn } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';

function UploadBox({ label, hint, file, onFile, selfie }) {
    const url = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );
    return (
        <label className="block cursor-pointer">
            <div
                className={`grid h-52 place-items-center overflow-hidden border-2 border-dashed border-teal/40 bg-white/60 transition hover:bg-white/80 ${selfie ? 'mx-auto w-44 rounded-[50%]' : 'rounded-3xl'}`}
            >
                {url ? (
                    <img
                        src={url}
                        alt={label}
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-center text-xs text-ink/55">
                        <Camera className="mx-auto mb-2 text-teal" />
                        {label}
                    </span>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                capture={selfie ? 'user' : undefined}
                hidden
                onChange={(e) => onFile(e.target.files[0] ?? null)}
            />
            <p className="mt-3 text-center text-xs text-ink/55">{hint}</p>
        </label>
    );
}

/* status dari controller: none | pending | approved | rejected */
export default function Verifikasi({ status = 'none', reason = null }) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
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
                <p className="mb-4 rounded-xl bg-red-50 p-3 text-xs text-red-700">
                    Verifikasi ditolak: {reason}. Upload ulang ya.
                </p>
            )}
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-ink/70">
                <span>
                    Langkah {step} dari 2:{' '}
                    {step === 1 ? 'Foto KTP atau KTM' : 'Foto selfie'}
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
            {step === 1 ? (
                <UploadBox
                    label="Ambil foto atau pilih dari galeri"
                    hint="Pastikan foto jelas, tidak buram, semua sisi terlihat."
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
            {(errors.ktm || errors.selfie) && (
                <p className="mt-2 text-xs text-red-600">
                    {errors.ktm || errors.selfie}
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
                    href="/home"
                    className="block text-center text-xs font-medium text-ink/55"
                >
                    Lewati dulu, verifikasi nanti
                </Link>
            </div>
        </AuthShell>
    );
}
