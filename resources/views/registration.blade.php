<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manav Seva Trust - Student Registration</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}" />
</head>
<body>
  <div class="page-shell">
    <header class="hero">
      <div class="hero-top">
        <div class="hero-logo">
          <div class="logo-mark">म</div>
          <div>
            <p class="logo-suptitle">मानव सेवा ट्रस्ट</p>
            <h1>MANAV SEVA TRUST</h1>
            <p class="logo-subtitle">Human Services College of Economics</p>
          </div>
        </div>
        <div class="hero-contact-card">
          <p class="contact-title">MAWAL, PUNE</p>
          <p>आय-४४, इलायझट ग्रीन एस्टेट, महिला कॉम्प्लेक्समध / टाकवे रोड, जांभुळ</p>
          <p>पिण्णल क्षेत्र - जिल्हा पूणे, महाराष्ट्र</p>
        </div>
      </div>

      <div class="hero-banner">
        <div>
          <p class="banner-label">प्राथमिक सदस्यता अर्ज</p>
          <h2>Student Registration Form</h2>
          <p class="banner-text">Complete the form below to apply for admission to the Manav Seva Trust College of Economics.</p>
        </div>
        <div class="banner-chip">Register Now</div>
      </div>
    </header>

    <main>
      <section class="register-section" id="registration">
        <div class="card form-card">
          <div class="section-title">
            <span>Registration Details</span>
            <p>Use the fields below to submit your application. All entries are text inputs styled with Material Design.</p>
          </div>

          @if (session('success'))
            <div class="message success">{{ session('success') }}</div>
          @endif

          @if ($errors->any())
            <div class="message error">
              <ul>
                @foreach ($errors->all() as $error)
                  <li>{{ $error }}</li>
                @endforeach
              </ul>
            </div>
          @endif

          <form id="registrationForm" class="form-grid" action="{{ route('register.store') }}" method="POST">
            @csrf
            <div class="input-group">
              <label for="full_name">पूर्ण नाव / Full Name</label>
              <input id="full_name" name="full_name" type="text" value="{{ old('full_name') }}" placeholder="Enter your full name" required />
            </div>
            <div class="input-group">
              <label for="father_name">वडीलांचे / पतीचे नाव</label>
              <input id="father_name" name="father_name" type="text" value="{{ old('father_name') }}" placeholder="Father / Husband name" required />
            </div>
            <div class="input-group">
              <label for="dob">जन्मतारख</label>
              <input id="dob" name="dob" type="text" value="{{ old('dob') }}" placeholder="DD / MM / YYYY" required />
            </div>
            <div class="input-group">
              <label for="gender">लिंग</label>
              <input id="gender" name="gender" type="text" value="{{ old('gender') }}" placeholder="पुरुष / महिला / इतर" required />
            </div>
            <div class="input-group">
              <label for="qualification">शैक्षणिक पात्रता</label>
              <input id="qualification" name="qualification" type="text" value="{{ old('qualification') }}" placeholder="Educational qualification" required />
            </div>
            <div class="input-group span-full">
              <label for="address">पूर्ण पत्ता</label>
              <input id="address" name="address" type="text" value="{{ old('address') }}" placeholder="Address as per residence" required />
            </div>
            <div class="input-group">
              <label for="taluka">तालुका</label>
              <input id="taluka" name="taluka" type="text" value="{{ old('taluka') }}" placeholder="Taluka" required />
            </div>
            <div class="input-group">
              <label for="district">जिल्हा</label>
              <input id="district" name="district" type="text" value="{{ old('district') }}" placeholder="District" required />
            </div>
            <div class="input-group">
              <label for="pincode">पिनकोड</label>
              <input id="pincode" name="pincode" type="text" value="{{ old('pincode') }}" placeholder="Pin code" required />
            </div>
            <div class="input-group">
              <label for="state">राज्य</label>
              <input id="state" name="state" type="text" value="{{ old('state') }}" placeholder="State" required />
            </div>
            <div class="input-group">
              <label for="mobile">मोबाइल क्रमांक</label>
              <input id="mobile" name="mobile" type="text" value="{{ old('mobile') }}" placeholder="Mobile number" required />
            </div>
            <div class="input-group">
              <label for="alternate_number">दुसरा क्रमांक</label>
              <input id="alternate_number" name="alternate_number" type="text" value="{{ old('alternate_number') }}" placeholder="Alternate phone number" />
            </div>
            <div class="input-group">
              <label for="email">ई-मेल आयडी</label>
              <input id="email" name="email" type="text" value="{{ old('email') }}" placeholder="Email address" required />
            </div>
            <div class="input-group">
              <label for="aadhaar">आधार क्रमांक</label>
              <input id="aadhaar" name="aadhaar" type="text" value="{{ old('aadhaar') }}" placeholder="Aadhaar number" required />
            </div>
            <div class="input-group">
              <label for="status">वैवाहिक स्थिती</label>
              <input id="status" name="status" type="text" value="{{ old('status') }}" placeholder="विवाहित / अविवाहित" required />
            </div>
            <div class="input-group span-full">
              <label for="special_skills">आपली विशेष कौशल्ये / रुची</label>
              <input id="special_skills" name="special_skills" type="text" value="{{ old('special_skills') }}" placeholder="List your special skills or interests" />
            </div>
            <div class="input-group span-full">
              <label for="why_join">तुम्ही संस्थेत का सामील होऊ इच्छिता?</label>
              <input id="why_join" name="why_join" type="text" value="{{ old('why_join') }}" placeholder="Why do you want to join?" />
            </div>

            <div class="section-divider span-full"></div>

            <div class="section-subtitle span-full">प्रस्तावक व अनुमोदक</div>
            <div class="input-group">
              <label for="proposer_name">प्रस्तावकाचे नाव</label>
              <input id="proposer_name" name="proposer_name" type="text" value="{{ old('proposer_name') }}" placeholder="Proposer name" />
            </div>
            <div class="input-group">
              <label for="proposer_member_id">सदस्य क्रमांक</label>
              <input id="proposer_member_id" name="proposer_member_id" type="text" value="{{ old('proposer_member_id') }}" placeholder="Member ID" />
            </div>
            <div class="input-group">
              <label for="seconder_name">अनुमोदकाचे नाव</label>
              <input id="seconder_name" name="seconder_name" type="text" value="{{ old('seconder_name') }}" placeholder="Seconder name" />
            </div>
            <div class="input-group">
              <label for="seconder_member_id">सदस्य क्रमांक</label>
              <input id="seconder_member_id" name="seconder_member_id" type="text" value="{{ old('seconder_member_id') }}" placeholder="Member ID" />
            </div>

            <div class="form-actions span-full">
              <button type="submit" class="btn-primary">Submit Application</button>
              <button type="reset" class="btn-secondary">Reset Form</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
