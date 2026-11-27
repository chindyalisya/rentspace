<?php

namespace Database\Seeders;

use App\Models\Barang;
use App\Models\User;
use App\Models\Verifikasi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /** nama mitra di data dummy => email akun login (password dev: "password") */
    private const MITRA = [
        'Latuconsina' => 'latuconsina@rentspace.test',
        'Dinda' => 'dinda@rentspace.test',
        'Rafi' => 'rafi@rentspace.test',
        'Salsa' => 'salsa@rentspace.test',
    ];

    /** [slug, nama, pemilik] -- sama dengan resources/js/lib/dummy.ts */
    private const BARANG = [
        ['canon-eos-30d', 'Canon EOS 30D', 'Latuconsina'],
        ['kalkulator-scientific', 'Kalkulator Scientific', 'Dinda'],
        ['almamater-unnes', 'Almamater UNNES', 'Rafi'],
        ['kemeja-putih-wanita', 'Kemeja Putih Wanita', 'Salsa'],
        ['kemeja-putih-pria', 'Kemeja Putih Pria', 'Rafi'],
        ['celana-hitam', 'Celana Bahan Hitam', 'Rafi'],
        ['rok-hitam', 'Rok Hitam Formal', 'Salsa'],
        ['sneakers-putih', 'Sneakers Putih', 'Salsa'],
        ['sepatu-hitam', 'Sepatu Hitam Casual', 'Rafi'],
        ['carrier-eiger-45l', 'Carrier 45L', 'Latuconsina'],
        ['tenda-dome-4p', 'Tenda Dome 4 Orang', 'Latuconsina'],
        ['trekking-pole', 'Trekking Pole', 'Latuconsina'],
        ['sepatu-gunung', 'Sepatu Gunung', 'Dinda'],
        ['sleeping-bag', 'Sleeping Bag', 'Dinda'],
        ['rompi-trail', 'Rompi Trail Running', 'Dinda'],
        ['speaker-jbl', 'Speaker JBL Go', 'Latuconsina'],
        ['stop-kontak', 'Stop Kontak 4 Lubang + USB', 'Dinda'],
    ];

    /**
     * Seed the application's database.
     * Aman dijalankan berulang.
     */
    public function run(): void
    {
        foreach ([
            ['Admin RentSpace', 'admin@rentspace.test', true],
            ['Test User', 'test@example.com', false],
        ] as [$name, $email, $admin]) {
            User::firstOrNew(['email' => $email])->forceFill([
                'name' => $name,
                'password' => 'password',
                'email_verified_at' => now(),
                'is_admin' => $admin,
            ])->save();
        }

        // Akun mitra demo: langsung terverifikasi supaya bisa dipakai login.
        $mitra = [];
        foreach (self::MITRA as $nama => $email) {
            $user = User::firstOrNew(['email' => $email]);
            $user->forceFill([
                'name' => $nama,
                'password' => 'password',
                'email_verified_at' => now(),
                'is_admin' => false,
            ])->save();

            Verifikasi::updateOrCreate(['user_id' => $user->id], [
                'jenis_dokumen' => 'ktm',
                'foto_ktm' => 'demo',
                'foto_selfie' => 'demo',
                'status' => 'approved',
                'diperiksa_at' => now(),
            ]);

            $mitra[$nama] = $user->id;
        }

        foreach (self::BARANG as [$slug, $nama, $pemilik]) {
            // Barang yang sudah ada tidak ditimpa, supaya hasil edit mitra aman.
            $barang = Barang::firstOrNew(['slug' => $slug]);
            if (! $barang->exists) {
                $barang->nama = $nama;
            }
            $barang->owner_id = $mitra[$pemilik];
            $barang->save();
        }
    }
}
