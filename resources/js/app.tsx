import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import RsSettingsLayout from '@/layouts/settings/rs-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        // Semua halaman RentSpace membawa layout sendiri (AppShell / AuthShell / AdminShell),
        // jadi tidak ada layout bawaan starter kit (sidebar "Laravel") sama sekali.
        // Hanya halaman pengaturan akun yang dibungkus RsSettingsLayout.
        if (name.startsWith('settings/')) {
            return RsSettingsLayout;
        }

        return null;
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

// Terapkan tema tersimpan (terang / gelap / ikuti sistem)
initializeTheme();
