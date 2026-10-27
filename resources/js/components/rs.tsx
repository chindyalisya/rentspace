// @ts-nocheck
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Eye, EyeOff, Package, Star } from 'lucide-react';

export const rupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');

export function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-rose to-teal text-sm font-semibold text-white shadow-md">R</span>
      <span className={`text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-teal-deep'}`}>RentSpace</span>
    </span>
  );
}

const variants = {
  primary: 'bg-gradient-to-b from-teal to-teal-deep text-white shadow-md shadow-teal/15 hover:brightness-105',
  rose: 'bg-gradient-to-b from-rose-deep to-[#a9756c] text-white shadow-md shadow-rose/20 hover:brightness-105',
  soft: 'glass text-teal-deep hover:bg-white/80',
};
export const btn = (v = 'primary', extra = '') =>
  `inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 ${variants[v]} ${extra}`;
export const Button = ({ variant = 'primary', className = '', ...p }) => <button {...p} className={btn(variant, className)} />;

export function Field({ icon: Icon, label, error, type = 'text', ...p }) {
  const [show, setShow] = useState(false);
  const pw = type === 'password';
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-ink/70">{label}</span>
        <span className={`flex items-center gap-2.5 rounded-2xl border bg-white/70 px-4 py-3 backdrop-blur transition focus-within:border-teal focus-within:bg-white focus-within:ring-4 focus-within:ring-teal/15 ${error ? 'border-red-400' : 'border-white/80'}`}>
          {Icon && <Icon size={17} className="shrink-0 text-teal/70" />}
          <input {...p} type={pw && show ? 'text' : type} className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35" />
          {pw && (
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'} className="text-ink/50 hover:text-ink">
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          )}
        </span>
      </label>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* Nama status disepakati tim, pakai persis ini di semua halaman */
const badge = {
  'Menunggu Konfirmasi': 'bg-neutral-200/80 text-neutral-700',
  Dikonfirmasi: 'bg-sky-100 text-sky-800',
  'Sedang Disewa': 'bg-emerald-100 text-emerald-800',
  'Jatuh Tempo': 'bg-orange-100 text-orange-800',
  Dikembalikan: 'bg-teal/10 text-teal',
  Selesai: 'bg-ink text-white',
  Dibatalkan: 'bg-red-100 text-red-700',
};
export const StatusBadge = ({ status }) => (
  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge[status] ?? badge['Menunggu Konfirmasi']}`}>{status}</span>
);

/* Satu-satunya versi Card Barang: home, katalog, search, profil mitra */
const tints = ['from-rose-soft to-rose/35', 'from-teal/10 to-teal/20', 'from-amber-50 to-rose-soft', 'from-rose/20 to-teal/15'];
export function ProductCard({ item, className = '' }) {
  const tint = tints[item.name.length % tints.length]; // placeholder sampai ada foto asli
  return (
    <Link href={`/barang/${item.slug}`} className={`group glass block overflow-hidden rounded-3xl p-2.5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}>
      <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${tint}`}>
        {item.img ? <img src={item.img} alt={item.name} className="size-full object-cover" /> : <span className="text-5xl drop-shadow transition duration-300 group-hover:scale-110">{item.emoji ?? '📦'}</span>}
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-teal-deep backdrop-blur"><i className="size-1.5 rounded-full bg-emerald-500" />Tersedia</span>
      </div>
      <div className="px-1.5 pb-1 pt-3">
        <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-semibold text-teal">{rupiah(item.price)}<span className="text-xs font-medium text-ink/50">/hari</span></p>
          <span className="flex items-center gap-1 text-xs font-medium"><Star size={12} className="fill-amber-400 text-amber-400" />{item.rating}</span>
        </div>
      </div>
    </Link>
  );
}
