// @ts-nocheck
import { Form, Head, Link } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }) {
    return (
        <AuthShell
            title="Lupa password"
            subtitle="Masukkan email akunmu, nanti kami kirim tautan untuk mengatur ulang password."
            footer={
                <>
                    Ingat password?{' '}
                    <Link href="/login" className="font-semibold text-teal">
                        Masuk
                    </Link>
                </>
            }
        >
            <Head title="Lupa password" />
            {status && (
                <p className="mb-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                    {status}
                </p>
            )}
            <Form {...email.form()} className="space-y-4">
                {({ processing, errors }) => (
                    <>
                        <Field
                            icon={Mail}
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            placeholder="nama@email.com"
                            error={errors.email}
                        />
                        <Button
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                        >
                            {processing ? 'Mengirim…' : 'Kirim tautan reset'}
                        </Button>
                    </>
                )}
            </Form>
        </AuthShell>
    );
}
