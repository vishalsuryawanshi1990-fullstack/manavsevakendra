@extends('admin.layout')

@section('title', 'डॅशबोर्ड')

@section('content')
    <div class="admin-topbar">
        <h2>डॅशबोर्ड</h2>
    </div>

    <div class="stat-grid">
        <div class="stat-card">
            <div class="value">{{ $stats['total'] }}</div>
            <div class="label">एकूण अर्ज</div>
        </div>
        <div class="stat-card">
            <div class="value">{{ $stats['life_membership'] }}</div>
            <div class="label">आजीव सदस्यत्व</div>
        </div>
        <div class="stat-card">
            <div class="value">{{ $stats['donation'] }}</div>
            <div class="label">देणगी नोंदणी</div>
        </div>
        <div class="stat-card">
            <div class="value">₹{{ number_format($stats['amount_collected'], 0) }}</div>
            <div class="label">जमा रक्कम (Paid)</div>
        </div>
        <div class="stat-card">
            <div class="value">{{ $stats['paid'] }} / {{ $stats['pending_payment'] }}</div>
            <div class="label">Paid / Payment Pending</div>
        </div>
        <div class="stat-card">
            <div class="value">{{ $stats['pending_review'] }}</div>
            <div class="label">पुनरावलोकन प्रलंबित</div>
        </div>
    </div>

    <div class="card">
        <h3 style="margin-top:0;">अलीकडील अर्ज</h3>
        <table>
            <thead>
                <tr>
                    <th>अर्ज क्र.</th>
                    <th>नाव</th>
                    <th>प्रकार</th>
                    <th>रक्कम</th>
                    <th>पेमेंट</th>
                    <th>स्थिती</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($recent as $app)
                    <tr>
                        <td>{{ $app->application_number }}</td>
                        <td>{{ $app->full_name }}</td>
                        <td>{{ $app->registration_type === 'life_membership' ? 'आजीव सदस्यत्व' : 'देणगी' }}</td>
                        <td>₹{{ number_format($app->amount, 0) }}</td>
                        <td><span class="badge badge-{{ $app->payment_status }}">{{ $app->payment_status }}</span></td>
                        <td><span class="badge badge-{{ $app->status }}">{{ $app->status }}</span></td>
                        <td><a href="{{ route('admin.registrations.show', $app) }}" class="btn btn-secondary btn-sm">पहा</a></td>
                    </tr>
                @empty
                    <tr><td colspan="7">अद्याप कोणतेही अर्ज नाहीत.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
