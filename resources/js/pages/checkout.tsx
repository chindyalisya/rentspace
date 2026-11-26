// @ts-nocheck
import { useEffect, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, CreditCard, MapPin, Truck } from 'lucide-react';
import { Button, btn, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { bySlug } from '@/lib/dummy';
import { daysBetween, getCart, setCart } from '@/lib/cart';

const ship = [
    ['pickup', 'Ambil di titik kampus', 'Gratis', MapPin],
    ['delivery', 'Diantar ke alamatmu', '+ Rp10.000', Truck],
];
const pay = ['QRIS', 'E-wallet', 'Transfer bank'];

const Choice = ({ on, onClick, children }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={on}
        className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm transition ${on ? 'border-teal bg-teal/10 ring-4 ring-teal/10' : 'border-ink/10 bg-surface/60 hover:bg-surface/80'}`}
    >
        {children}
    </button>
);

export default function Checkout() {
    const [cart, set] = useState([]);
    const [method, setMethod] = useState('pickup');
    const [bayar, setBayar] = useState('QRIS');
    const [addr, setAddr] = useState('');
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const codes = usePage().props.checkoutKodes ?? [];
    useEffect(() => set(getCart()), []);
    const rows = cart.map((c) => ({
        ...c,
        it: bySlug(c.slug),
        days: daysBetween(c.start, c.end),
    }));
    const total =
        rows.reduce(
            (s, r) => s + (r.it.price * r.days + r.it.deposit) * r.qty,
            0,
        ) + (method === 'delivery' ? 10000 : 0);

    const submit = () => {
        setBusy(true);
        setErr('');
        router.post(
            '/pesanan',
            {
                metode: method,
                alamat: addr,
                bayar,
                items: rows.map((r) => ({
                    slug: r.slug,
                    qty: r.qty,
                    start: r.start,
                    end: r.end,
                    mitra: r.it.owner,
                    total: (r.it.price * r.days + r.it.deposit) * r.qty,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: () => setCart([]),
                onError: (e) =>
                    setErr(Object.values(e)[0] || 'Pesanan gagal dibuat.'),
                onFinish: () => setBusy(false),
            },
        );
    };

    if (codes.length) {
        return (
            <AppShell>
                <Head title="Pesanan dibuat" />
                <div className="glass mx-auto mt-8 grid max-w-md place-items-center rounded-3xl p-10 text-center">
                    <CheckCircle2 size={48} className="text-teal" />
                    <h1 className="mt-4 text-2xl font-semibold text-teal-ink">
                        Pesanan dibuat
                    </h1>
                    <p className="mt-1 text-sm text-ink/60">
                        Tunjukkan kode ini saat serah terima barang.
                    </p>
                    {codes.map((code) => (
                        <p
                            key={code}
                            className="mt-3 rounded-2xl bg-surface/80 px-8 py-3 text-2xl font-semibold tracking-widest text-teal"
                        >
                            {code}
                        </p>
                    ))}
                    <Link href="/pesanan" className={btn('primary', 'mt-7')}>
                        Lihat pesanan saya
                    </Link>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="Checkout" />
            <h1 className="text-3xl font-semibold tracking-tight text-teal-ink">
                Checkout
            </h1>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-6">
                    <section className="glass rounded-3xl p-5">
                        <p className="mb-3 font-medium">Pengambilan</p>
                        <div className="space-y-2.5">
                            {ship.map(([v, l, p, Icon]) => (
                                <Choice
                                    key={v}
                                    on={method === v}
                                    onClick={() => setMethod(v)}
                                >
                                    <Icon size={18} className="text-teal" />
                                    <span className="flex-1">{l}</span>
                                    <span className="text-xs text-ink/55">
                                        {p}
                                    </span>
                                </Choice>
                            ))}
                        </div>
                        {method === 'delivery' && (
                            <textarea
                                value={addr}
                                onChange={(e) => setAddr(e.target.value)}
                                rows={2}
                                placeholder="Alamat lengkap pengantaran"
                                className="mt-3 w-full rounded-2xl border border-ink/10 bg-surface/70 p-3 text-sm outline-none focus:border-teal focus:ring-4 focus:ring-teal/15"
                            />
                        )}
                    </section>
                    <section className="glass rounded-3xl p-5">
                        <p className="mb-3 font-medium">Pembayaran</p>
                        <div className="grid gap-2.5 sm:grid-cols-3">
                            {pay.map((p) => (
                                <Choice
                                    key={p}
                                    on={bayar === p}
                                    onClick={() => setBayar(p)}
                                >
                                    <CreditCard
                                        size={18}
                                        className="text-teal"
                                    />
                                    {p}
                                </Choice>
                            ))}
                        </div>
                    </section>
                </div>
                <aside className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-24">
                    <p className="font-medium text-teal-ink">Pesananmu</p>
                    <ul className="mt-4 space-y-2 text-sm">
                        {rows.map(({ it, days, ...c }) => (
                            <li
                                key={c.slug}
                                className="flex justify-between gap-3"
                            >
                                <span className="text-ink/70">
                                    {it.name}, {days} hari
                                </span>
                                <span>{rupiah(it.price * days * c.qty)}</span>
                            </li>
                        ))}
                        {!rows.length && (
                            <li className="text-ink/55">
                                Belum ada barang.{' '}
                                <Link href="/katalog" className="text-teal">
                                    Pilih barang
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="mt-4 flex justify-between border-t border-ink/10 pt-3 font-medium">
                        <span>Total termasuk deposit</span>
                        <span className="text-teal">{rupiah(total)}</span>
                    </div>
                    <Button
                        className="mt-5"
                        disabled={
                            busy ||
                            !rows.length ||
                            (method === 'delivery' && !addr)
                        }
                        onClick={submit}
                    >
                        {busy ? 'Memproses...' : 'Bayar sekarang'}
                    </Button>
                    {err && (
                        <p className="mt-3 text-sm text-red-600">{err}</p>
                    )}
                </aside>
            </div>
        </AppShell>
    );
}