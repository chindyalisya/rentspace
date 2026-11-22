<?php

use App\Models\User;
use App\Models\Verifikasi;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
beforeEach(fn () => $this->withoutVite());

function userDenganStatus(?string $status): User
{
    $user = User::factory()->create();

    if ($status) {
        Verifikasi::create([
            'user_id'       => $user->id,
            'jenis_dokumen' => 'ktm',
            'foto_ktm'      => 'verifikasi/ktm.jpg',
            'foto_selfie'   => 'verifikasi/selfie.jpg',
            'status'        => $status,
        ]);
    }

    return $user;
}

test('tamu diarahkan ke login', function () {
    $this->get('/home')->assertRedirect('/login');
});

test('user belum verifikasi diarahkan ke halaman verifikasi', function () {
    $this->actingAs(userDenganStatus(null))
        ->get('/home')
        ->assertRedirect(route('verifikasi'));
});

test('user yang ditolak diarahkan ke halaman verifikasi', function () {
    $this->actingAs(userDenganStatus('rejected'))
        ->get('/home')
        ->assertRedirect(route('verifikasi'));
});

test('user pending boleh jelajah tapi belum boleh checkout atau mitra', function () {
    $user = userDenganStatus('pending');

    $this->actingAs($user)->get('/home')->assertOk();
    $this->actingAs($user)->get('/checkout')->assertRedirect(route('verifikasi'));
    $this->actingAs($user)->get('/mitra/dashboard')->assertRedirect(route('verifikasi'));
});

test('user approved boleh checkout dan mitra', function () {
    $user = userDenganStatus('approved');

    $this->actingAs($user)->get('/checkout')->assertOk();
    $this->actingAs($user)->get('/mitra/dashboard')->assertOk();
});

test('kirim KTP tersimpan dengan jenis dokumen ktp', function () {
    Storage::fake();
    $user = userDenganStatus(null);

    $this->actingAs($user)->post('/verifikasi', [
        'jenis'  => 'ktp',
        'ktm'    => UploadedFile::fake()->image('ktp.jpg'),
        'selfie' => UploadedFile::fake()->image('selfie.jpg'),
    ])->assertRedirect(route('verifikasi'));

    $v = $user->fresh()->verifikasi;
    expect($v->jenis_dokumen)->toBe('ktp')->and($v->status)->toBe('pending');
});

test('jenis dokumen selain ktm atau ktp ditolak', function () {
    $this->actingAs(userDenganStatus(null))
        ->post('/verifikasi', ['jenis' => 'sim'])
        ->assertSessionHasErrors('jenis');
});

test('admin tidak diwajibkan verifikasi', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)->get('/home')->assertOk();
    $this->actingAs($admin)->get('/checkout')->assertOk();
});

test('admin yang membuka halaman verifikasi diarahkan ke panel admin', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)->get('/verifikasi')->assertRedirect(route('admin.verifikasi'));
});

test('laporan penjualan hanya untuk user approved', function () {
    $this->actingAs(userDenganStatus('pending'))->get('/mitra/laporan')->assertRedirect(route('verifikasi'));
    $this->actingAs(userDenganStatus('approved'))->get('/mitra/laporan')->assertOk();
});

test('halaman notifikasi bisa dibuka semua user yang login', function () {
    $this->actingAs(userDenganStatus(null))->get('/notifikasi')->assertOk();
    $this->actingAs(userDenganStatus('rejected'))->get('/notifikasi')->assertOk();
});
