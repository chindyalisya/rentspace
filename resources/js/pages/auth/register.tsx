// @ts-nocheck
import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Backpack, Check, Lock, Mail, Phone, Store, User } from 'lucide-react';
import { DocTypeToggle, UploadBox } from '@/components/identity-upload';
import { Button, Field } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';

const roleOptions = [
    ['penyewa', 'Penyewa', 'Cari dan sewa barang', Backpack],
    ['mitra', 'Mitra', 'Sewakan barangmu', Store],
];

const stepTitle = ['Data akun', 'Foto identitas', 'Selfie'];

export default function Register() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        roles: ['penyewa'],
        terms: false,
        jenis: 'ktm',
        ktm: null,
        selfie: null,
    });
    const set = (k) => (e) => setData(k, e.target.value);
    // boleh dua-duanya: mahasiswa bisa menyewa sekaligus menyewakan
    const toggle = (r) =>
        setData(
            'roles',
            data.roles.includes(r)
                ? data.roles.filter((x) => x !== r)
                : [...data.roles, r],
        );
    const mismatch =
        data.password_confirmation &&
        data.password !== data.password_confirmation;
    const valid =
        data.name &&
        data.email &&
        data.phone &&
        data.password.length >= 8 &&
        data.password_confirmation &&
        !mismatch &&
        data.roles.length &&
        data.terms;

    const kirim = () =>
        post('/register', {
            forceFormData: true,
            onError: (e) => {
                // kembali ke langkah yang punya error
                if (
                    e.name ||
                    e.email ||
                    e.phone ||
                    e.password ||
                    e.roles ||
                    e.terms
                )
                    setStep(1);
                else if (e.jenis || e.ktm) setStep(2);
            },
        });

    const submit = (e) => {
        e.preventDefault();
        if (step === 1 && valid) setStep(2);
        else if (step === 2 && data.ktm) setStep(3);
        else if (step === 3 && data.ktm && data.selfie && !processing) kirim();
    };

    return (
        <AuthShell
            title="Buat akun"
            subtitle="Satu akun untuk menyewa dan menyewakan. Identitas diverifikasi sekali di awal."
            footer={
                <>
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-teal">
                        Masuk
                    </Link>
                </>
            }
        >
            <Head title="Daftar" />
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-ink/70">
                <span>
                    Langkah {step} dari 3: {stepTitle[step - 1]}
                </span>
                <span className="ml-auto flex gap-1.5">
                    {[1, 2, 3].map((n) => (
                        <span
                            key={n}
                            className={`h-1.5 w-8 rounded-full ${n <= step ? 'bg-teal' : 'bg-teal/20'}`}
                        />
                    ))}
                </span>
            </div>
            {step === 1 && (
                <>
                    <p className="mb-2 text-xs font-semibold text-ink/70">
                        Daftar sebagai (boleh dua-duanya)
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {roleOptions.map(([v, label, desc, Icon]) => {
                            const on = data.roles.includes(v);
                            return (
                                <button
                                    key={v}
                                    type="button"
                                    onClick={() => toggle(v)}
                                    aria-pressed={on}
                                    className={`relative rounded-2xl border p-3.5 text-left transition ${on ? 'border-teal bg-teal/10 ring-4 ring-teal/10' : 'border-ink/10 bg-surface/60 hover:bg-surface/80'}`}
                                >
                                    <Icon
                                        size={20}
                                        className={
                                            on ? 'text-teal' : 'text-ink/50'
                                        }
                                    />
                                    <p className="mt-2 text-sm font-semibold">
                                        {label}
                                    </p>
                                    <p className="text-xs text-ink/55">
                                        {desc}
                                    </p>
                                    {on && (
                                        <Check
                                            size={16}
                                            className="absolute top-3 right-3 text-teal"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    {errors.roles && (
                        <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                            {errors.roles}
                        </p>
                    )}
                </>
            )}

            <form onSubmit={submit} className="mt-5 space-y-4">
                {step === 1 && (
                    <>
                        <Field
                            icon={User}
                            label="Nama lengkap"
                            placeholder="Nama sesuai KTM"
                            autoComplete="name"
                            value={data.name}
                            onChange={set('name')}
                            error={errors.name}
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                icon={Mail}
                                label="Email"
                                type="email"
                                placeholder="nama@email.com"
                                autoComplete="email"
                                value={data.email}
                                onChange={set('email')}
                                error={errors.email}
                            />
                            <Field
                                icon={Phone}
                                label="No. HP"
                                type="tel"
                                placeholder="08xxxxxxxxxx"
                                autoComplete="tel"
                                value={data.phone}
                                onChange={set('phone')}
                                error={errors.phone}
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                icon={Lock}
                                label="Password"
                                type="password"
                                placeholder="Min. 8 karakter"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={set('password')}
                                error={errors.password}
                            />
                            <Field
                                icon={Lock}
                                label="Konfirmasi password"
                                type="password"
                                placeholder="Ulangi password"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={set('password_confirmation')}
                                error={
                                    mismatch
                                        ? 'Password tidak cocok'
                                        : undefined
                                }
                            />
                        </div>
                        <label className="flex items-start gap-2.5 text-xs text-ink/70">
                            <input
                                type="checkbox"
                                checked={data.terms}
                                onChange={(e) =>
                                    setData('terms', e.target.checked)
                                }
                                className="mt-0.5 accent-teal"
                            />
                            <span>
                                Saya setuju dengan Syarat &amp; Ketentuan serta
                                Kebijakan Privasi
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {errors.terms}
                            </p>
                        )}
                        <Button disabled={!valid}>Lanjut</Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <DocTypeToggle
                            value={data.jenis}
                            onChange={(v) => setData('jenis', v)}
                        />
                        <UploadBox
                            label="Ambil foto atau pilih dari galeri"
                            hint={`Foto ${data.jenis.toUpperCase()} harus jelas, tidak buram, dan semua sisi terlihat.`}
                            file={data.ktm}
                            onFile={(f) => setData('ktm', f)}
                        />
                        {(errors.jenis || errors.ktm) && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {errors.jenis || errors.ktm}
                            </p>
                        )}
                        <Button disabled={!data.ktm}>Lanjut</Button>
                        <Button
                            type="button"
                            variant="soft"
                            onClick={() => setStep(1)}
                        >
                            Kembali
                        </Button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <UploadBox
                            selfie
                            label="Selfie"
                            hint="Wajah terlihat jelas dengan pencahayaan cukup."
                            file={data.selfie}
                            onFile={(f) => setData('selfie', f)}
                        />
                        {errors.selfie && (
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {errors.selfie}
                            </p>
                        )}
                        <Button disabled={!data.selfie || processing}>
                            {processing ? 'Memproses…' : 'Buat akun'}
                        </Button>
                        <Button
                            type="button"
                            variant="soft"
                            onClick={() => setStep(2)}
                        >
                            Kembali
                        </Button>
                    </>
                )}
            </form>
        </AuthShell>
    );
}
