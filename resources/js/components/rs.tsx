// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Eye, EyeOff, Star } from 'lucide-react';

export const rupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');

export function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`grid size-8 place-items-center rounded-lg font-display text-[17px] font-semibold leading-none ${light ? 'bg-cream text-teal-deep' : 'bg-teal-deep text-cream'}`}>R</span>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? 'text-cream' : 'text-teal-deep'}`}>RentSpace</span>
    </span>
  );
}

const variants = {
  primary: 'bg-teal-deep text-cream shadow-sm hover:bg-teal hover:shadow-md',
  rose: 'bg-rose-deep text-white shadow-sm hover:bg-[#a96a5f] hover:shadow-md',
  soft: 'glass text-teal-deep hover:bg-white',
};
export const btn = (v = 'primary', extra = '') =>
  `inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:scale-[.97] disabled:pointer-events-none disabled:opacity-50 ${variants[v]} ${extra}`;
export const Button = ({ variant = 'primary', className = '', ...p }) => <button {...p} className={btn(variant, className)} />;

export function Field({ icon: Icon, label, error, type = 'text', ...p }) {
  const [show, setShow] = useState(false);
  const pw = type === 'password';
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-ink/70">{label}</span>
        <span className={`flex items-center gap-2.5 rounded-xl border bg-white px-4 py-3 transition duration-300 focus-within:border-teal focus-within:ring-4 focus-within:ring-teal/15 ${error ? 'border-red-400' : 'border-ink/15'}`}>
          {Icon && <Icon size={17} className="shrink-0 text-teal/70" />}
          <input {...p} type={pw && show ? 'text' : type} className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/35" />
          {pw && (
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'} className="text-ink/50 transition hover:text-ink">
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

/* Muncul halus saat masuk layar */
export function Reveal({ as: T = 'div', delay = 0, className = '', children, ...p }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <T ref={ref} style={{ '--d': `${delay}ms` }} className={`rs-reveal ${on ? 'is-in' : ''} ${className}`} {...p}>{children}</T>;
}

/* Foto barang. item.cut = foto berlatar putih, dibaur ke warna kartu. Ukuran diatur lewat className */
export function Thumb({ item, className = '', zoom = true, eager = false }) {
  const [ok, setOk] = useState(false);
  const [bad, setBad] = useState(false);
  const img = useRef(null);
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setOk(true); }, []);
  return (
    <div className={`${ok || bad ? '' : 'rs-thumb'} relative shrink-0 overflow-hidden bg-sand ${className}`}>
      {item?.img && !bad ? (
        <img
          ref={img}
          src={item.img}
          alt={item.name}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setOk(true)}
          onError={() => setBad(true)}
          className={`absolute inset-0 size-full transition duration-700 ease-out ${ok ? 'opacity-100' : 'opacity-0'} ${item.cut ? 'object-contain p-[7%] mix-blend-multiply' : 'object-cover'} ${zoom ? 'group-hover:scale-[1.06]' : ''}`}
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center p-2 text-center text-[11px] font-medium text-ink/40">{item?.name}</span>
      )}
    </div>
  );
}

/* Satu-satunya versi Card Barang: home, katalog, search, profil mitra */
export function ProductCard({ item, className = '', index = 0, animate = true }) {
  return (
    <Link
      href={`/barang/${item.slug}`}
      style={{ '--d': `${Math.min(index, 8) * 55}ms` }}
      className={`group rs-card ${animate ? 'rs-rise' : ''} glass block overflow-hidden rounded-2xl ${className}`}
    >
      <div className="relative">
        <Thumb item={item} className="aspect-[5/4] w-full" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-teal-deep shadow-sm"><i className="size-1.5 rounded-full bg-emerald-500" />Tersedia</span>
      </div>
      <div className="px-3.5 pb-3.5 pt-3">
        <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
        <p className="mt-0.5 text-xs text-ink/50">{item.owner}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-bold text-teal-deep">{rupiah(item.price)}<span className="text-xs font-medium text-ink/50">/hari</span></p>
          <span className="flex items-center gap-1 text-xs font-medium"><Star size={12} className="fill-amber-400 text-amber-400" />{item.rating}</span>
        </div>
      </div>
    </Link>
  );
}
