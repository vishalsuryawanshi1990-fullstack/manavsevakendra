@extends('admin.layout')

@section('title', 'सेटिंग्स व पेमेंट')

@section('content')
    <div class="admin-topbar">
        <h2>सेटिंग्स व पेमेंट</h2>
    </div>

    <form method="POST" action="{{ route('admin.settings.update') }}">
        @csrf
        @method('PUT')

        <div class="card">
            <h3 style="margin-top:0;">पेमेंट पॅकेज</h3>
            <div class="field">
                <label for="life_membership_amount">आजीव सदस्यत्व शुल्क (₹) — निश्चित रक्कम</label>
                <input type="number" step="1" id="life_membership_amount" name="life_membership_amount"
                    value="{{ old('life_membership_amount', $settings['life_membership_amount']->value ?? 10000) }}" required />
            </div>
            <div class="field">
                <label for="donation_suggested_amounts">देणगीसाठी सुचवलेल्या रकमा (स्वल्पविरामाने विभागलेल्या, ₹)</label>
                <input type="text" id="donation_suggested_amounts" name="donation_suggested_amounts"
                    value="{{ old('donation_suggested_amounts', $settings['donation_suggested_amounts']->value ?? '') }}" placeholder="500,1000,2100,5000,10000" />
            </div>
            <p style="font-size:.78rem; color:#64748b;">
                Razorpay API keys .env फाईलमध्ये (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) सेट करा — सुरक्षिततेसाठी ते इथून बदलता येत नाहीत.
            </p>
        </div>

        <div class="card">
            <h3 style="margin-top:0;">होमपेज मजकूर</h3>
            <div class="field">
                <label for="hero_title">Hero शीर्षक</label>
                <input type="text" id="hero_title" name="hero_title" value="{{ old('hero_title', $settings['hero_title']->value ?? '') }}" />
            </div>
            <div class="field">
                <label for="hero_location">Hero स्थान</label>
                <input type="text" id="hero_location" name="hero_location" value="{{ old('hero_location', $settings['hero_location']->value ?? '') }}" />
            </div>
            <div class="field">
                <label for="hero_description">Hero वर्णन</label>
                <textarea id="hero_description" name="hero_description" rows="4">{{ old('hero_description', $settings['hero_description']->value ?? '') }}</textarea>
            </div>
            <div class="field">
                <label for="mission_text">ध्येय (Mission) मजकूर</label>
                <textarea id="mission_text" name="mission_text" rows="4">{{ old('mission_text', $settings['mission_text']->value ?? '') }}</textarea>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-top:0;">संस्था तपशील</h3>
            <div class="field">
                <label for="address">पत्ता</label>
                <textarea id="address" name="address" rows="2">{{ old('address', $settings['address']->value ?? '') }}</textarea>
            </div>
            <div class="field">
                <label for="reg_trust_number">सार्वजनिक विश्वस्त संस्था नोंदणी क्र.</label>
                <input type="text" id="reg_trust_number" name="reg_trust_number" value="{{ old('reg_trust_number', $settings['reg_trust_number']->value ?? '') }}" />
            </div>
            <div class="field">
                <label for="reg_society_number">संस्था नोंदणी क्र.</label>
                <input type="text" id="reg_society_number" name="reg_society_number" value="{{ old('reg_society_number', $settings['reg_society_number']->value ?? '') }}" />
            </div>
        </div>

        <button type="submit" class="btn btn-primary">सर्व सेटिंग्स जतन करा</button>
    </form>
@endsection
