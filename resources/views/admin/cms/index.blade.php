@extends('admin.layout')

@section('title', 'वेबसाईट CMS')

@section('content')
    <div class="admin-topbar">
        <h2>वेबसाईट CMS</h2>
    </div>

    <div class="card">
        <p style="margin-top:0; color:#64748b; font-size:.85rem;">
            प्रत्येक विभाग संपादित करून वेबसाईटवरील संबंधित यादी/मजकूर बदलू शकता. बदल जतन केल्यावर लगेच होम-पेजवर दिसतील.
        </p>
        <table>
            <thead>
                <tr>
                    <th>विभाग</th>
                    <th>Key</th>
                    <th>शेवटचा बदल</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach ($sections as $section)
                    <tr>
                        <td>{{ $section->label }}</td>
                        <td><code>{{ $section->key }}</code></td>
                        <td>{{ $section->updated_at->diffForHumans() }}</td>
                        <td><a href="{{ route('admin.cms.edit', $section) }}" class="btn btn-secondary btn-sm">संपादित करा</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
