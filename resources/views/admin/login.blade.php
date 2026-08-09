<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Login — मानव सेवा केंद्र</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('admin.css') }}" />
</head>
<body>
    <div class="login-shell">
        <div class="login-card">
            <h1>मानव सेवा केंद्र</h1>
            <p class="sub">Admin Panel Login</p>

            @if ($errors->any())
                <div class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login.attempt') }}">
                @csrf
                <div class="field">
                    <label for="email">ई-मेल</label>
                    <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus />
                </div>
                <div class="field">
                    <label for="password">पासवर्ड</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center;">लॉगिन करा</button>
            </form>
        </div>
    </div>
</body>
</html>
