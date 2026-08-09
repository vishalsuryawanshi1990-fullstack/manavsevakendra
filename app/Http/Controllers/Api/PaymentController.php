<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MembershipApplication;
use App\Services\RazorpayService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function verify(Request $request, RazorpayService $razorpay)
    {
        $validated = $request->validate([
            'application_id' => 'required|integer|exists:membership_applications,id',
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        $application = MembershipApplication::query()->findOrFail($validated['application_id']);

        if ($application->razorpay_order_id !== $validated['razorpay_order_id']) {
            return response()->json(['verified' => false, 'message' => 'ऑर्डर जुळत नाही.'], 422);
        }

        $verified = $razorpay->verifySignature(
            $validated['razorpay_order_id'],
            $validated['razorpay_payment_id'],
            $validated['razorpay_signature']
        );

        if (! $verified) {
            $application->payment_status = 'failed';
            $application->save();

            return response()->json(['verified' => false, 'message' => 'पेमेंट सत्यापित करता आले नाही.'], 422);
        }

        $application->payment_status = 'paid';
        $application->razorpay_payment_id = $validated['razorpay_payment_id'];
        $application->razorpay_signature = $validated['razorpay_signature'];
        $application->save();

        return response()->json([
            'verified' => true,
            'message' => 'पेमेंट यशस्वी झाले आहे. धन्यवाद!',
            'application_number' => $application->application_number,
        ]);
    }
}
