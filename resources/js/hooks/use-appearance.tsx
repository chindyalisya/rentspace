import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
    readonly toggleAppearance: () => void;
};

// Kunci penyimpanan yang sama dipakai skrip kecil di resources/views/app.blade.php
// (supaya tema langsung benar sebelum React tampil, tanpa kedip putih).
const STORAGE_KEY = 'rs-appearance';

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'light';

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const readStored = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    try {
        const v = localStorage.getItem(STORAGE_KEY);

        return v === 'dark' || v === 'system' || v === 'light' ? v : 'light';
    } catch {
        return 'light';
    }
};

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const isDarkMode = (appearance: Appearance): boolean => {
    if (appearance === 'dark') {
        return true;
    }

    if (appearance === 'system') {
        return mediaQuery()?.matches ?? false;
    }

    return false;
};

const applyTheme = (appearance: Appearance): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', isDark ? '#141b1c' : '#faf6ee');
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

// Saat mode "ikuti sistem", tema ikut berubah ketika pengaturan OS berubah
const handleSystemThemeChange = (): void => {
    if (currentAppearance === 'system') {
        applyTheme('system');
        notify();
    }
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    currentAppearance = readStored();
    applyTheme(currentAppearance);

    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
    // Snapshot memuat pilihan DAN hasil resolusinya, supaya komponen ikut
    // render ulang ketika tema sistem berubah saat mode "system".
    const snapshot = useSyncExternalStore(
        subscribe,
        () =>
            `${currentAppearance}|${isDarkMode(currentAppearance) ? 'dark' : 'light'}`,
        () => 'light|light',
    );
    const [appearanceRaw, resolvedRaw] = snapshot.split('|');
    const appearance = appearanceRaw as Appearance;
    const resolvedAppearance = resolvedRaw as ResolvedAppearance;

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // penyimpanan diblokir (mode privat): tema tetap berlaku untuk sesi ini
        }

        setCookie(STORAGE_KEY, mode);

        applyTheme(mode);
        notify();
    };

    const toggleAppearance = (): void =>
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
        toggleAppearance,
    } as const;
}
