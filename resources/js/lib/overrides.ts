// @ts-nocheck
import { items } from '@/lib/dummy';

// Menimpa data dummy dengan hasil edit mitra (dari database).
// Aman dipanggil berulang: selalu mulai dari nilai asli dummy.
export function applyBarangOverrides(map) {
    for (const it of items) {
        it.__asli ??= {
            name: it.name,
            price: it.price,
            deposit: it.deposit,
            desc: it.desc,
        };
        const o = map?.[it.slug];
        it.name = o?.nama || it.__asli.name;
        it.price = o?.harga ?? it.__asli.price;
        it.deposit = o?.deposit ?? it.__asli.deposit;
        it.desc = o?.deskripsi ?? it.__asli.desc;
        it.nonaktif = o ? !o.aktif : false;
    }
}
