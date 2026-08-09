@extends('admin.layout')

@section('title', 'नोंदणी अर्ज')

@section('content')
    <div class="admin-topbar">
        <h2>नोंदणी अर्ज</h2>
    </div>

    <form method="GET" class="filters card">
        <input type="text" name="q" placeholder="नाव / मोबाईल / ई-मेल / अर्ज क्र." value="{{ $filters['q'] ?? '' }}" />
        <select name="type">
            <option value="">सर्व प्रकार</option>
            <option value="life_membership" @selected(($filters['type'] ?? '') === 'life_membership')>आजीव सदस्यत्व</option>
            <option value="donation" @selected(($filters['type'] ?? '') === 'donation')>देणगी</option>
        </select>
        <select name="payment_status">
            <option value="">सर्व पेमेंट स्थिती</option>
            <option value="pending" @selected(($filters['payment_status'] ?? '') === 'pending')>Pending</option>
            <option value="paid" @selected(($filters['payment_status'] ?? '') === 'paid')>Paid</option>
            <option value="failed" @selected(($filters['payment_status'] ?? '') === 'failed')>Failed</option>
        </select>
        <select name="status">
            <option value="">सर्व स्थिती</option>
            <option value="pending" @selected(($filters['status'] ?? '') === 'pending')>Pending</option>
            <option value="approved" @selected(($filters['status'] ?? '') === 'approved')>Approved</option>
            <option value="rejected" @selected(($filters['status'] ?? '') === 'rejected')>Rejected</option>
        </select>
        <button type="submit" class="btn btn-primary btn-sm">फिल्टर करा</button>
        <a href="{{ route('admin.registrations.index') }}" class="btn btn-secondary btn-sm">रीसेट</a>
    </form>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>अर्ज क्र.</th>
                    <th>नाव</th>
                    <th>मोबाईल</th>
                    <th>प्रकार</th>
                    <th>रक्कम</th>
                    <th>पेमेंट</th>
                    <th>स्थिती</th>
                    <th>तारीख</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @forelse ($applications as $app)
                    <tr>
                        <td>{{ $app->application_number }}</td>
                        <td>{{ $app->full_name }}</td>
                        <td>{{ $app->mobile }}</td>
                        <td><span class="badge badge-{{ $app->registration_type === 'life_membership' ? 'life' : 'donation' }}">{{ $app->registration_type === 'life_membership' ? 'आजीव सदस्यत्व' : 'देणगी' }}</span></td>
                        <td>₹{{ number_format($app->amount, 0) }}</td>
                        <td><span class="badge badge-{{ $app->payment_status }}">{{ $app->payment_status }}</span></td>
                        <td><span class="badge badge-{{ $app->status }}">{{ $app->status }}</span></td>
                        <td>{{ $app->created_at->format('d-M-Y') }}</td>
                        <td><a href="{{ route('admin.registrations.show', $app) }}" class="btn btn-secondary btn-sm">पहा</a></td>
                    </tr>
                @empty
                    <tr><td colspan="9">कोणतेही अर्ज सापडले नाहीत.</td></tr>
                @endforelse
            </tbody>
        </table>
        <div class="pagination">{{ $applications->links() }}</div>
    </div>
@endsection
