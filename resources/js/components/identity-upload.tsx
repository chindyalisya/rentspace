// @ts-nocheck
import { useMemo } from 'react';
import { Camera } from 'lucide-react';

/* Dipakai di halaman register dan halaman /verifikasi */
export function UploadBox({ label, hint, file, onFile, selfie }) {
    const url = useMemo(
        () => (file ? URL.createObjectURL(file) : null),
        [file],
    );
    return (
        <label className="block cursor-pointer">
            <div
                className={`grid h-52 place-items-center overflow-hidden border-2 border-dashed border-teal/40 bg-white/60 transition hover:bg-white/80 ${selfie ? 'mx-auto w-44 rounded-[50%]' : 'rounded-3xl'}`}
            >
                {url ? (
                    <img
                        src={url}
                        alt={label}
                        className="size-full object-cover"
                    />
                ) : (
                    <span className="text-center text-xs text-ink/55">
                        <Camera className="mx-auto mb-2 text-teal" />
                        {label}
                    </span>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                capture={selfie ? 'user' : undefined}
                hidden
                onChange={(e) => onFile(e.target.files[0] ?? null)}
            />
            <p className="mt-3 text-center text-xs text-ink/55">{hint}</p>
        </label>
    );
}

export function DocTypeToggle({ value, onChange }) {
    return (
        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-teal/10 p-1">
            {[
                ['ktm', 'KTM'],
                ['ktp', 'KTP'],
            ].map(([v, l]) => (
                <button
                    key={v}
                    type="button"
                    onClick={() => onChange(v)}
                    className={`rounded-xl py-2 text-sm font-semibold transition ${value === v ? 'bg-white text-teal-deep shadow-sm' : 'text-ink/55'}`}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
