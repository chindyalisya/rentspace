import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

/* Tombol cepat terang <-> gelap untuk header. Pilihan "ikuti sistem" ada di Pengaturan > Tampilan. */
export function ThemeToggle({ className = '' }: { className?: string }) {
    const { resolvedAppearance, toggleAppearance } = useAppearance();
    const dark = resolvedAppearance === 'dark';
    const label = dark ? 'Pakai mode terang' : 'Pakai mode gelap';

    return (
        <button
            type="button"
            onClick={toggleAppearance}
            aria-label={label}
            title={label}
            className={`grid size-10 place-items-center rounded-xl text-ink/70 transition hover:bg-surface/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${className}`}
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
