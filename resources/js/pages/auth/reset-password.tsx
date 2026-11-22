// @ts-nocheck
import { Form, Head } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';
import { Button, Field } from '@/components/rs';
import { AuthShell } from '@/layouts/shell';
import { update } from '@/routes/password';

export default function ResetPassword({ token, email, passwordRules }) {
    return (
        <AuthShell
            title="Atur ulang password"
            subtitle="Buat password baru untuk akun RentSpace kamu."
        >
            <Head title="Atur ulang password" />
            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="space-y-4"
            >
                {({ processing, errors }) => (
                    <>
                        <Field
                            icon={Mail}
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            readOnly
                            error={errors.email}
                        />
                        <Field
                            icon={Lock}
                            label="Password baru"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            autoFocus
                            placeholder="Min. 8 karakter"
                            passwordrules={passwordRules}
                            error={errors.password}
                        />
                        <Field
                            icon={Lock}
                            label="Konfirmasi password"
                            name="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Ulangi password baru"
                            passwordrules={passwordRules}
                            error={errors.password_confirmation}
                        />
                        <Button
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing ? 'Menyimpan…' : 'Simpan password'}
                        </Button>
                    </>
                )}
            </Form>
        </AuthShell>
    );
}
