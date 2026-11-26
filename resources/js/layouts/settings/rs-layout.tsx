// @ts-nocheck
import { Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/layouts/shell';

const tabs = [
    ['/settings/profile', 'Profil'],
    ['/settings/security', 'Keamanan'],
    ['/settings/appearance', 'Tampilan'],
];

/* Layout Pengaturan akun bertema RentSpace (menggantikan sidebar bawaan starter kit) */
export default function RsSettingsLayout({ children }) {
    const { url } = usePage();
    return (
        <AppShell>
            <div className="mx-auto max-w-2xl">
                <h1 className="text-3xl font-semibold tracking-tight text-teal-ink">
                    Pengaturan akun
                </h1>
                <p className="mt-1 text-sm text-ink/60">
                    Kelola profil, keamanan, dan tampilan akunmu.
                </p>
                <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                    {tabs.map(([h, l]) => (
                        <Link
                            key={h}
                            href={h}
                            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${url.startsWith(h) ? 'bg-teal-deep text-paper shadow-sm' : 'glass text-ink/70 hover:bg-surface'}`}
                        >
                            {l}
                        </Link>
                    ))}
                </div>
                <section className="glass mt-6 space-y-10 rounded-3xl p-6 sm:p-8">
                    {children}
                </section>
            </div>
        </AppShell>
    );
}
