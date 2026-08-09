<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function create()
    {
        return view('registration');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'dob' => 'required|string|max:50',
            'gender' => 'required|string|max:50',
            'qualification' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'taluka' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'pincode' => 'required|string|max:50',
            'state' => 'required|string|max:255',
            'mobile' => 'required|string|max:50',
            'alternate_number' => 'nullable|string|max:50',
            'email' => 'required|email|max:255',
            'aadhaar' => 'required|string|max:50',
            'status' => 'required|string|max:255',
            'special_skills' => 'nullable|string|max:500',
            'why_join' => 'nullable|string|max:500',
            'proposer_name' => 'nullable|string|max:255',
            'proposer_member_id' => 'nullable|string|max:255',
            'seconder_name' => 'nullable|string|max:255',
            'seconder_member_id' => 'nullable|string|max:255',
        ]);

        Registration::create($validated);

        return redirect()->back()->with('success', 'Your registration has been submitted successfully.');
    }
}
