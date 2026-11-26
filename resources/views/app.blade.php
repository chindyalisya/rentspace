<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Tema terang / gelap / ikut sistem. Dipasang sebelum CSS dan React dimuat supaya tidak ada kedip. --}}
        <script>
            (function () {
                var mode = 'light';
                try {
                    var saved = localStorage.getItem('rs-appearance');
                    if (saved === 'dark' || saved === 'system' || saved === 'light') {
                        mode = saved;
                    }
                } catch (e) {}
                var dark =
                    mode === 'dark' ||
                    (mode === 'system' &&
                        window.matchMedia &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches);
                var root = document.documentElement;
                root.classList.toggle('dark', dark);
                root.style.colorScheme = dark ? 'dark' : 'light';
            })();
        </script>
        <style>
            html {
                background-color: #faf6ee;
                color-scheme: light;
            }
            html.dark {
                background-color: #141b1c;
                color-scheme: dark;
            }
        </style>
        <meta name="theme-color" content="#faf6ee">
        <meta name="color-scheme" content="light dark">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
