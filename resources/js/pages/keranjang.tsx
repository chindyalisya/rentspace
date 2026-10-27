// @ts-nocheck
import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { btn, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { bySlug } from '@/lib/dummy';
import { daysBetween, getCart, setCart } from '@/lib/cart';

export default function Keranjang() {
  const [cart, set] = useState([]);
  useEffect(() => set(getCart()), []);
  const save = (c) => { set(c); setCart(c); };
  const rows = cart.map((c) => ({ ...c, it: bySlug(c.slug), days: daysBetween(c.start, c.end) }));
  const sewa = rows.reduce((s, r) => s + r.it.price * r.days * r.qty, 0);
  const dep = rows.reduce((s, r) => s + r.it.deposit * r.qty, 0);
  const qty = (slug, d) => save(cart.map((c) => (c.slug === slug ? { ...c, qty: Math.max(1, c.qty + d) } : c)));

  return (
    <AppShell>
      <Head title="Keranjang" />
      <h1 className="text-3xl font-semibold tracking-tight text-teal-deep">Keranjang</h1>
      {!rows.length ? (
        <div className="glass mt-8 grid place-items-center rounded-3xl px-6 py-16 text-center">
          <ShoppingBag size={36} className="text-rose-deep/60" />
          <p className="mt-3 font-medium">Keranjangmu masih kosong</p>
          <p className="mb-6 text-sm text-ink/55">Pilih barang dan tanggal sewa dulu.</p>
          <Link href="/katalog" className={btn('primary', '!w-auto')}>Lihat katalog</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3">
            {rows.map(({ it, days, ...c }) => (
              <div key={c.slug} className="glass flex items-center gap-4 rounded-3xl p-4">
                <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-soft to-teal/20 text-4xl">{it.emoji}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{it.name}</p>
                  <p className="text-xs text-ink/55">{c.start} sampai {c.end}, {days} hari</p>
                  <p className="mt-1 text-sm font-medium text-teal">{rupiah(it.price * days * c.qty)}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/70 p-1">
                  <button aria-label="Kurangi" onClick={() => qty(c.slug, -1)} className="grid size-7 place-items-center rounded-full hover:bg-white"><Minus size={14} /></button>
                  <span className="w-4 text-center text-sm">{c.qty}</span>
                  <button aria-label="Tambah" onClick={() => qty(c.slug, 1)} className="grid size-7 place-items-center rounded-full hover:bg-white"><Plus size={14} /></button>
                </div>
                <button aria-label="Hapus" onClick={() => save(cart.filter((x) => x.slug !== c.slug))} className="text-ink/40 hover:text-rose-deep"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
          <aside className="glass h-fit rounded-[2rem] p-6 lg:sticky lg:top-24">
            <p className="font-medium text-teal-deep">Ringkasan</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-ink/60">Total sewa</dt><dd>{rupiah(sewa)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/60">Deposit (dikembalikan)</dt><dd>{rupiah(dep)}</dd></div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-medium"><dt>Total</dt><dd className="text-teal">{rupiah(sewa + dep)}</dd></div>
            </dl>
            <Link href="/checkout" className={btn('primary', 'mt-5')}>Lanjut ke pembayaran</Link>
          </aside>
        </div>
      )}
    </AppShell>
  );
}
