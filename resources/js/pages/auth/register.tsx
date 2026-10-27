// @ts-nocheck
import { Head, Link, useForm } from '@inertiajs/react';
import { Backpack, Check, Lock, Mail, Phone, Store, User } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';

const roleOptions = [
    ['penyewa', 'Penyewa', 'Cari dan sewa barang', Backpack],
    ['mitra', 'Mitra', 'Sewakan barangmu', Store],
];

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        roles: ['penyewa'],
        terms: false,
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

    return (
        <AuthShell
            title="Buat akun"
            subtitle="Satu akun untuk menyewa dan menyewakan."
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
                            className={`relative rounded-2xl border p-3.5 text-left transition ${on ? 'border-teal bg-teal/10 ring-4 ring-teal/10' : 'border-white/80 bg-white/60 hover:bg-white/80'}`}
                        >
                            <Icon
                                size={20}
                                className={on ? 'text-teal' : 'text-ink/50'}
                            />
                            <p className="mt-2 text-sm font-semibold">
                                {label}
                            </p>
                            <p className="text-xs text-ink/55">{desc}</p>
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
                <p className="mt-1.5 text-xs text-red-600">{errors.roles}</p>
            )}

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post('/register');
                }}
                className="mt-5 space-y-4"
            >
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
                        error={mismatch ? 'Password tidak cocok' : undefined}
                    />
                </div>
                <label className="flex items-start gap-2.5 text-xs text-ink/70">
                    <input
                        type="checkbox"
                        checked={data.terms}
                        onChange={(e) => setData('terms', e.target.checked)}
                        className="mt-0.5 accent-teal"
                    />
                    <span>
                        Saya setuju dengan Syarat &amp; Ketentuan serta
                        Kebijakan Privasi
                    </span>
                </label>
                {errors.terms && (
                    <p className="text-xs text-red-600">{errors.terms}</p>
                )}
                <Button disabled={!valid || processing}>
                    {processing ? 'Memproses…' : 'Buat akun'}
                </Button>
            </form>
        </AuthShell>
    );
}
