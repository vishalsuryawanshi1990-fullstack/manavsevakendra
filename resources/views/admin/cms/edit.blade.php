@extends('admin.layout')

@section('title', $section->label)

@section('content')
    <div class="admin-topbar">
        <h2>{{ $section->label }}</h2>
        <a href="{{ route('admin.cms.index') }}" class="btn btn-secondary btn-sm">&larr; यादीकडे परत</a>
    </div>

    <div class="card">
        <p style="margin-top:0; color:#64748b; font-size:.85rem;">
            खालील JSON मध्ये बदल करा आणि जतन करा. रचना (keys) तशीच ठेवा — फक्त मजकूर/मूल्ये बदला किंवा नवीन आयटम त्याच पद्धतीने जोडा.
        </p>
        <form method="POST" action="{{ route('admin.cms.update', $section) }}">
            @csrf
            @method('PUT')
            <div class="field">
                <textarea name="data_json" class="code" spellcheck="false">{{ old('data_json', $json) }}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">जतन करा</button>
        </form>
    </div>
@endsection
