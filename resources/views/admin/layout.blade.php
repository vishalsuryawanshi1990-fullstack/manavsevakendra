<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@yield('title', 'Admin') — मानव सेवा केंद्र</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('admin.css') }}" />
</head>
<body>
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <h1>मानव सेवा केंद्र</h1>
            <p class="tagline">Admin Panel</p>
            <nav class="admin-nav">
                <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">डॅशबोर्ड</a>
                <a href="{{ route('admin.registrations.index') }}" class="{{ request()->routeIs('admin.registrations.*') ? 'active' : '' }}">नोंदणी अर्ज</a>
                <a href="{{ route('admin.cms.index') }}" class="{{ request()->routeIs('admin.cms.*') ? 'active' : '' }}">वेबसाईट CMS</a>
                <a href="{{ route('admin.settings.edit') }}" class="{{ request()->routeIs('admin.settings.*') ? 'active' : '' }}">सेटिंग्स व पेमेंट</a>
            </nav>
            <form method="POST" action="{{ route('admin.logout') }}" style="margin-top:2rem;">
                @csrf
                <button type="submit" class="btn btn-secondary btn-sm" style="width:100%; background:transparent; border-color:rgba(255,255,255,.3); color:#fff;">लॉगआऊट</button>
            </form>
        </aside>
        <main class="admin-main">
            @if (session('status'))
                <div class="alert alert-success">{{ session('status') }}</div>
            @endif
            @if ($errors->any())
                <div class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif
            @yield('content')
        </main>
    </div>
</body>
</html>
