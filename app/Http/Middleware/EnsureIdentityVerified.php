<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Gate verifikasi identitas (KTM/KTP).
 *
 *  verifikasi           -> wajib sudah mengirim dokumen (pending / approved lolos)
 *  verifikasi:approved  -> wajib sudah disetujui admin (checkout, mitra)
 *
 * Status none / rejected diarahkan ke halaman /verifikasi.
 * Akun admin tidak perlu diverifikasi.
 */
class EnsureIdentityVerified
{
    public function handle(Request $request, Closure $next, string $level = 'submitted'): Response
    {
        $user = $request->user();

        if ($user?->is_admin) {
            return $next($request);
        }

        $status = $user?->verifikasi?->status;

        $lolos = $level === 'approved'
            ? $status === 'approved'
            : in_array($status, ['pending', 'approved'], true);

        return $lolos ? $next($request) : redirect()->route('verifikasi');
    }
}