// @ts-nocheck
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    return (
        <AuthShell
            title="Masuk"
            subtitle="Selamat datang kembali di RentSpace."
            footer={
                <>
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-semibold text-teal">
                        Daftar di sini
                    </Link>
                </>
            }
        >
            <Head title="Masuk" />
            {status && (
                <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700">
                    {status}
                </p>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post('/login');
                }}
                className="space-y-4"
            >
                <Field
                    icon={Mail}
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
                <Field
                    icon={Lock}
                    label="Password"
                    type="password"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />
                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-ink/70">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="accent-teal"
                        />
                        Ingat saya
                    </label>
                    <Link
                        href="/forgot-password"
                        className="font-semibold text-teal"
                    >
                        Lupa password?
                    </Link>
                </div>
                <Button disabled={processing}>
                    {processing ? 'Memproses…' : 'Masuk'}
                </Button>
            </form>
        </AuthShell>
    );
}
