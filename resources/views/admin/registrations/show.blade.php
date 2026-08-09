@extends('admin.layout')

@section('title', $application->application_number)

@section('content')
    <div class="admin-topbar">
        <h2>{{ $application->application_number }} — {{ $application->full_name }}</h2>
        <a href="{{ route('admin.registrations.index') }}" class="btn btn-secondary btn-sm">&larr; यादीकडे परत</a>
    </div>

    <div class="card">
        <h3 style="margin-top:0;">अर्जदाराची माहिती</h3>
        <div class="detail-grid">
            @if ($application->photo_path)
                <div class="item">
                    <div class="k">फोटो</div>
                    <img class="photo-preview" src="{{ asset('storage/'.$application->photo_path) }}" alt="फोटो" />
                </div>
            @endif
            <div class="item"><div class="k">पूर्ण नाव</div><div class="v">{{ $application->full_name }}</div></div>
            <div class="item"><div class="k">वडिलांचे / पतीचे नाव</div><div class="v">{{ $application->father_or_husband_name }}</div></div>
            <div class="item"><div class="k">जन्मतारीख</div><div class="v">{{ optional($application->dob)->format('d-M-Y') }}</div></div>
            <div class="item"><div class="k">लिंग</div><div class="v">{{ $application->gender }}</div></div>
            <div class="item"><div class="k">शैक्षणिक पात्रता</div><div class="v">{{ $application->education }}</div></div>
            <div class="item"><div class="k">व्यवसाय</div><div class="v">{{ $application->occupation ?: '—' }}</div></div>
            <div class="item"><div class="k">पूर्ण पत्ता</div><div class="v">{{ $application->address }}</div></div>
            <div class="item"><div class="k">तालुका / जिल्हा</div><div class="v">{{ $application->taluka }}, {{ $application->district }}</div></div>
            <div class="item"><div class="k">पिनकोड / राज्य</div><div class="v">{{ $application->pincode }}, {{ $application->state }}</div></div>
            <div class="item"><div class="k">मोबाईल</div><div class="v">{{ $application->mobile }}</div></div>
            <div class="item"><div class="k">व्हॉट्सअॅप</div><div class="v">{{ $application->whatsapp ?: '—' }}</div></div>
            <div class="item"><div class="k">ई-मेल</div><div class="v">{{ $application->email }}</div></div>
            <div class="item"><div class="k">आधार क्रमांक</div><div class="v">{{ $application->aadhar_number ?: '—' }}</div></div>
            <div class="item"><div class="k">पॅन क्रमांक</div><div class="v">{{ $application->pan_number ?: '—' }}</div></div>
            <div class="item"><div class="k">रक्तगट</div><div class="v">{{ $application->blood_group ?: '—' }}</div></div>
            <div class="item"><div class="k">वैवाहिक स्थिती</div><div class="v">{{ $application->marital_status ?: '—' }}</div></div>
            <div class="item"><div class="k">विशेष कौशल्ये</div><div class="v">{{ $application->special_skills ?: '—' }}</div></div>
            <div class="item"><div class="k">कसे जोडले जाऊ इच्छिता</div><div class="v">{{ $application->how_to_join ?: '—' }}</div></div>
        </div>
    </div>

    <div class="card">
        <h3 style="margin-top:0;">प्रस्तावक / अनुमोदक</h3>
        <div class="detail-grid">
            <div class="item"><div class="k">प्रस्तावक</div><div class="v">{{ $application->proposer_name ?: '—' }} ({{ $application->proposer_member_number ?: '—' }})</div></div>
            <div class="item"><div class="k">अनुमोदक</div><div class="v">{{ $application->seconder_name ?: '—' }} ({{ $application->seconder_member_number ?: '—' }})</div></div>
        </div>
    </div>

    <div class="card">
        <h3 style="margin-top:0;">पेमेंट तपशील</h3>
        <div class="detail-grid">
            <div class="item"><div class="k">प्रकार</div><div class="v">{{ $application->registration_type === 'life_membership' ? 'आजीव सदस्यत्व (₹10,000)' : 'देणगी' }}</div></div>
            <div class="item"><div class="k">रक्कम</div><div class="v">₹{{ number_format($application->amount, 2) }}</div></div>
            <div class="item"><div class="k">पेमेंट स्थिती</div><div class="v"><span class="badge badge-{{ $application->payment_status }}">{{ $application->payment_status }}</span></div></div>
            <div class="item"><div class="k">Razorpay Order ID</div><div class="v">{{ $application->razorpay_order_id ?: '—' }}</div></div>
            <div class="item"><div class="k">Razorpay Payment ID</div><div class="v">{{ $application->razorpay_payment_id ?: '—' }}</div></div>
        </div>
    </div>

    <div class="card">
        <h3 style="margin-top:0;">कार्यालयीन प्रक्रिया</h3>
        <form method="POST" action="{{ route('admin.registrations.update', $application) }}">
            @csrf
            @method('PUT')
            <div class="detail-grid">
                <div class="field">
                    <label for="status">स्थिती</label>
                    <select id="status" name="status">
                        <option value="pending" @selected($application->status === 'pending')>Pending</option>
                        <option value="approved" @selected($application->status === 'approved')>Approved</option>
                        <option value="rejected" @selected($application->status === 'rejected')>Rejected</option>
                    </select>
                </div>
                <div class="field">
                    <label for="member_number">सदस्य क्रमांक</label>
                    <input type="text" id="member_number" name="member_number" value="{{ old('member_number', $application->member_number) }}" />
                </div>
                <div class="field">
                    <label for="membership_fee">सदस्यत्व शुल्क जमा (₹)</label>
                    <input type="number" step="0.01" id="membership_fee" name="membership_fee" value="{{ old('membership_fee', $application->membership_fee) }}" />
                </div>
                <div class="field">
                    <label for="receipt_number">पावती क्रमांक</label>
                    <input type="text" id="receipt_number" name="receipt_number" value="{{ old('receipt_number', $application->receipt_number) }}" />
                </div>
                <div class="field">
                    <label for="board_resolution_number">संचालक मंडळाचा ठराव क्र.</label>
                    <input type="text" id="board_resolution_number" name="board_resolution_number" value="{{ old('board_resolution_number', $application->board_resolution_number) }}" />
                </div>
                <div class="field">
                    <label for="resolution_date">ठराव दिनांक</label>
                    <input type="date" id="resolution_date" name="resolution_date" value="{{ old('resolution_date', optional($application->resolution_date)->format('Y-m-d')) }}" />
                </div>
                <div class="field">
                    <label for="office_received_date">अर्ज प्राप्त दिनांक</label>
                    <input type="date" id="office_received_date" name="office_received_date" value="{{ old('office_received_date', optional($application->office_received_date)->format('Y-m-d')) }}" />
                </div>
                <div class="field" style="grid-column: 1 / -1;">
                    <label for="rejection_reason">कारण (नामंजूर असल्यास)</label>
                    <input type="text" id="rejection_reason" name="rejection_reason" value="{{ old('rejection_reason', $application->rejection_reason) }}" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary">अद्ययावत करा</button>
        </form>

        <form method="POST" action="{{ route('admin.registrations.destroy', $application) }}" style="margin-top:1rem;" onsubmit="return confirm('हा अर्ज कायमचा हटवायचा आहे का?');">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger btn-sm">अर्ज हटवा</button>
        </form>
    </div>
@endsection
