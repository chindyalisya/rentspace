import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import RsSettingsLayout from '@/layouts/settings/rs-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        // Halaman yang sudah membawa layout RentSpace sendiri (AppShell / AuthShell / AdminShell)
        const tanpaLayout = [
            'welcome',
            'onboarding',
            'home',
            'katalog',
            'barang',
            'keranjang',
            'checkout',
            'pesanan',
            'profil',
            'dashboard',
            'verifikasi',
            'auth/login',
            'auth/register',
            'auth/forgot-password',
            'auth/reset-password',
        ];

        switch (true) {
            case tanpaLayout.includes(name) ||
                name.startsWith('mitra/') ||
                name.startsWith('admin/'):
                return null;
            case name.startsWith('settings/'):
                return RsSettingsLayout;
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4a7581',
    },
});

// RentSpace hanya punya tema terang
initializeTheme();
