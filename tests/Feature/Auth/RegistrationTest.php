<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register with identity verification', function () {
    Storage::fake();

    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'jenis' => 'ktm',
        'ktm' => UploadedFile::fake()->image('ktm.jpg'),
        'selfie' => UploadedFile::fake()->image('selfie.jpg'),
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(config('fortify.home'));

    $verifikasi = User::where('email', 'test@example.com')->first()->verifikasi;
    expect($verifikasi->status)->toBe('pending')
        ->and($verifikasi->jenis_dokumen)->toBe('ktm');
});

test('registration without identity photos is rejected', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSessionHasErrors(['jenis', 'ktm', 'selfie']);
    $this->assertGuest();
    expect(User::where('email', 'test@example.com')->exists())->toBeFalse();
});
