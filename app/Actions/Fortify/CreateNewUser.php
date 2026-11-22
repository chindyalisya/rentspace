<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     * Verifikasi identitas (KTM/KTP + selfie) dikirim sekaligus saat daftar.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'jenis'    => ['required', 'in:ktm,ktp'],
            'ktm'      => ['required', 'image', 'max:4096'],
            'selfie'   => ['required', 'image', 'max:4096'],
        ])->validate();

        return DB::transaction(function () use ($input) {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
            ]);

            $user->verifikasi()->create([
                'jenis_dokumen' => $input['jenis'],
                'foto_ktm'      => $input['ktm']->store('verifikasi'),
                'foto_selfie'   => $input['selfie']->store('verifikasi'),
                'status'        => 'pending',
            ]);

            return $user;
        });
    }
}
