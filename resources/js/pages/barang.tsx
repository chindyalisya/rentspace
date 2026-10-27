// @ts-nocheck
import { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ShieldCheck, Star } from 'lucide-react';
import { Button, ProductCard, Reveal, Thumb, rupiah } from '@/components/rs';
import { AppShell } from '@/layouts/shell';
import { bySlug, items } from '@/lib/dummy';
import { daysBetween, getCart, setCart, today } from '@/lib/cart';

const rules = [
    'Wajib verifikasi KTM sebelum menyewa',
    'Barang dikembalikan dalam kondisi yang sama',
    'Keterlambatan dikenakan denda per hari',
];

export default function Barang({ slug }) {
    const it = bySlug(slug);
    const [start, setStart] = useState(today(1));
    const [end, setEnd] = useState(today(3));
    useEffect(() => {
        if (end < start) setEnd(start);
    }, [start]);
    const days = daysBetween(start, end);
    const sewa = it.price * days;
    const mirip = items
        .filter((x) => x.cat === it.cat && x.slug !== it.slug)
        .slice(0, 4);
    const add = (to) => {
        setCart([
            ...getCart().filter((c) => c.slug !== it.slug),
            { slug: it.slug, qty: 1, start, end },
        ]);
        router.visit(to);
    };
    const date =
        'w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/15';

    return (
        <AppShell>
            <Head title={it.name} />
            <nav className="mb-5 text-xs text-ink/50">
                <Link href="/katalog" className="hover:text-teal">
                    Katalog
                </Link>{' '}
                /{' '}
                <Link href={`/katalog/${it.cat}`} className="hover:text-teal">
                    {it.cat.replace('-', ' ')}
                </Link>{' '}
                / <span className="text-ink/70">{it.name}</span>
            </nav>
            <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
                <div key={it.slug}>
                    <Thumb
                        item={it}
                        eager
                        zoom={false}
                        className="rs-pop glass aspect-[4/3] w-full rounded-3xl"
                    />
                    <div
                        className="rs-rise mt-6 flex items-start justify-between gap-4"
                        style={{ '--d': '80ms' }}
                    >
                        <h1 className="text-3xl text-teal-deep sm:text-4xl">
                            {it.name}
                        </h1>
                        <span className="glass flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm">
                            <Star
                                size={14}
                                className="fill-amber-400 text-amber-400"
                            />
                            {it.rating}
                        </span>
                    </div>
                    <p
                        className="rs-rise mt-3 leading-relaxed text-ink/70"
                        style={{ '--d': '140ms' }}
                    >
                        {it.desc}
                    </p>
                    <div
                        className="glass rs-rise mt-6 flex items-center gap-3 rounded-2xl p-4"
                        style={{ '--d': '200ms' }}
                    >
                        <span className="grid size-11 place-items-center rounded-full bg-rose-soft font-display text-lg font-semibold text-rose-deep">
                            {it.owner[0]}
                        </span>
                        <div>
                            <p className="text-sm font-semibold">{it.owner}</p>
                            <p className="text-xs text-ink/55">
                                Mitra terverifikasi, ambil di Kampus UNNES
                            </p>
                        </div>
                    </div>
                    <h2 className="mt-8 text-lg text-teal-deep">Syarat sewa</h2>
                    <ul className="mt-3 space-y-2 text-sm text-ink/70">
                        {rules.map((r) => (
                            <li key={r} className="flex gap-2">
                                <ShieldCheck
                                    size={16}
                                    className="mt-0.5 shrink-0 text-teal"
                                />
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>

                <aside
                    className="glass rs-rise h-fit rounded-3xl p-6 lg:sticky lg:top-24"
                    style={{ '--d': '120ms' }}
                >
                    <p className="font-display text-3xl font-semibold text-teal-deep">
                        {rupiah(it.price)}
                        <span className="font-sans text-sm font-normal text-ink/50">
                            /hari
                        </span>
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <label className="text-xs text-ink/60">
                            Mulai
                            <input
                                type="date"
                                min={today()}
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className={`${date} mt-1`}
                            />
                        </label>
                        <label className="text-xs text-ink/60">
                            Selesai
                            <input
                                type="date"
                                min={start}
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                className={`${date} mt-1`}
                            />
                        </label>
                    </div>
                    <dl className="mt-5 space-y-2.5 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-ink/60">Sewa {days} hari</dt>
                            <dd>{rupiah(sewa)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-ink/60">
                                Deposit (dikembalikan)
                            </dt>
                            <dd>{rupiah(it.deposit)}</dd>
                        </div>
                        <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold">
                            <dt>Total</dt>
                            <dd className="text-teal-deep">
                                {rupiah(sewa + it.deposit)}
                            </dd>
                        </div>
                    </dl>
                    <div className="mt-5 space-y-3">
                        <Button onClick={() => add('/checkout')}>
                            Sewa sekarang
                        </Button>
                        <Button
                            variant="soft"
                            onClick={() => add('/keranjang')}
                        >
                            Tambah ke keranjang
                        </Button>
                    </div>
                    <p className="mt-4 text-center text-xs text-ink/50">
                        Belum verifikasi?{' '}
                        <Link
                            href="/verifikasi"
                            className="font-semibold text-teal"
                        >
                            Verifikasi KTM
                        </Link>
                    </p>
                </aside>
            </div>

            {mirip.length > 0 && (
                <section className="mt-16">
                    <Reveal>
                        <h2 className="mb-5 text-2xl text-teal-deep">
                            Barang serupa
                        </h2>
                    </Reveal>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
                        {mirip.map((m, n) => (
                            <Reveal key={m.slug} delay={n * 70}>
                                <ProductCard item={m} animate={false} />
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}
        </AppShell>
    );
}
