<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MembershipApplication;
use App\Models\Setting;
use App\Services\RazorpayService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MembershipApplicationController extends Controller
{
    public function store(Request $request, RazorpayService $razorpay)
    {
        $validated = $request->validate([
            'registration_type' => 'required|in:life_membership,donation',
            'amount' => 'required_if:registration_type,donation|nullable|numeric|min:1|max:1000000',
            'full_name' => 'required|string|max:255',
            'father_or_husband_name' => 'required|string|max:255',
            'dob' => 'required|date',
            'gender' => 'required|in:पुरुष,महिला,इतर',
            'education' => 'required|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'address' => 'required|string|max:1000',
            'taluka' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'pincode' => 'required|string|max:10',
            'state' => 'required|string|max:255',
            'mobile' => 'required|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
            'landline' => 'nullable|string|max:20',
            'aadhar_number' => 'nullable|string|max:20',
            'pan_number' => 'nullable|string|max:10',
            'blood_group' => 'nullable|string|max:5',
            'marital_status' => 'nullable|in:विवाहित,अविवाहित',
            'special_skills' => 'nullable|string|max:255',
            'how_to_join' => 'nullable|string|max:255',
            'declaration_accepted' => 'required|accepted',
            'declaration_date' => 'nullable|date',
            'declaration_place' => 'nullable|string|max:255',
            'applicant_signature_name' => 'nullable|string|max:255',
            'proposer_name' => 'nullable|string|max:255',
            'proposer_member_number' => 'nullable|string|max:255',
            'proposer_signature_name' => 'nullable|string|max:255',
            'proposer_date' => 'nullable|date',
            'seconder_name' => 'nullable|string|max:255',
            'seconder_member_number' => 'nullable|string|max:255',
            'seconder_signature_name' => 'nullable|string|max:255',
            'seconder_date' => 'nullable|date',
            'photo' => 'nullable|image|max:5120',
        ]);

        // The life-membership fee is authoritative from settings, never trusted from the client —
        // only the donation amount (the donor's own voluntary choice) comes from the request.
        $validated['amount'] = $validated['registration_type'] === 'life_membership'
            ? (float) Setting::get('life_membership_amount', '10000')
            : (float) $validated['amount'];

        $validated['declaration_accepted'] = true;
        unset($validated['photo']);

        $application = MembershipApplication::create($validated);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('membership-photos', 'public');
            $application->photo_path = $path;
        }

        $application->application_number = sprintf('MSK-%s-%04d', now()->format('Y'), $application->id);
        $application->save();

        $razorpayOrder = null;

        if ($razorpay->isConfigured()) {
            $order = $razorpay->createOrder(
                $application->amount,
                $application->application_number,
                ['application_id' => $application->id, 'registration_type' => $application->registration_type]
            );

            $application->razorpay_order_id = $order['id'];
            $application->save();

            $razorpayOrder = [
                'order_id' => $order['id'],
                'key_id' => $razorpay->keyId(),
                'amount' => $application->amount,
            ];
        }

        return response()->json([
            'message' => 'अर्ज यशस्वीरित्या सादर झाला आहे.',
            'application_number' => $application->application_number,
            'application_id' => $application->id,
            'amount' => $application->amount,
            'razorpay' => $razorpayOrder,
        ], Response::HTTP_CREATED);
    }
}
