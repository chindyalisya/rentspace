<?php

namespace App\Http\Middleware;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            // Hasil edit mitra (harga, deposit, deskripsi, status) untuk menimpa data dummy di frontend.
            'barangOverrides' => fn () => Barang::all(['slug', 'nama', 'harga', 'deposit', 'deskripsi', 'aktif'])
                ->mapWithKeys(fn ($b) => [$b->slug => [
                    'nama' => $b->nama,
                    'harga' => $b->harga,
                    'deposit' => $b->deposit,
                    'deskripsi' => $b->deskripsi,
                    'aktif' => $b->aktif,
                ]])
                ->all(),
            'checkoutKodes' => fn () => $request->session()->get('checkoutKodes'),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
