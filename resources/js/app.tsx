import { createInertiaApp, usePage } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import RsSettingsLayout from '@/layouts/settings/rs-layout';
import { applyBarangOverrides } from '@/lib/overrides';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Dibungkus di atas semua halaman: dijalankan sebelum halaman dirender,
// jadi harga/deskripsi/status hasil edit mitra langsung terpakai.
function RsRoot({ children }) {
    applyBarangOverrides(usePage().props.barangOverrides);

    return children;
}

function RsRootSettings({ children }) {
    return (
        <RsRoot>
            <RsSettingsLayout>{children}</RsSettingsLayout>
        </RsRoot>
    );
}

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        // Semua halaman RentSpace membawa layout sendiri (AppShell / AuthShell / AdminShell),
        // jadi tidak ada layout bawaan starter kit (sidebar "Laravel") sama sekali.
        // Hanya halaman pengaturan akun yang dibungkus RsSettingsLayout.
        if (name.startsWith('settings/')) {
            return RsRootSettings;
        }

        return RsRoot;
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
