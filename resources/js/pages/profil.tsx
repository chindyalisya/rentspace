// @ts-nocheck
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BadgeCheck, ChevronRight, HelpCircle, LogOut, MapPin, Store, UserRound, Wallet } from 'lucide-react';
import { AppShell } from '@/layouts/shell';

const menu = [[UserRound, 'Edit profil', '/settings/profile'], [BadgeCheck, 'Verifikasi identitas', '/verifikasi'], [MapPin, 'Alamat tersimpan', '/alamat'], [Wallet, 'Dompet dan deposit', '/dompet'], [Store, 'Mode mitra', '/mitra/dashboard'], [HelpCircle, 'Pusat bantuan', '/bantuan']];

export default function Profil() {
  const user = usePage().props.auth?.user;
  const name = user?.name ?? 'Pengguna';
  return (
    <AppShell>
      <Head title="Profil" />
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose to-rose-soft p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-cream/60 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <span className="grid size-16 place-items-center rounded-full bg-white/80 text-2xl font-medium text-teal shadow-md">{name[0]}</span>
            <div><p className="text-xl font-semibold text-teal-deep">{name}</p><p className="text-sm text-teal-deep/70">{user?.email}</p></div>
          </div>
        </div>
        <div className="glass mt-4 divide-y divide-ink/5 overflow-hidden rounded-3xl">
          {menu.map(([Icon, l, href]) => (
            <Link key={l} href={href} className="flex items-center gap-3 px-5 py-4 text-sm transition hover:bg-white/60"><Icon size={18} className="text-teal" /><span className="flex-1">{l}</span><ChevronRight size={16} className="text-ink/30" /></Link>
          ))}
        </div>
        <button onClick={() => router.post('/logout')} className="glass mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium text-rose-deep transition hover:bg-white/80"><LogOut size={17} />Keluar</button>
      </div>
    </AppShell>
  );
}
