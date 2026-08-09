<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\RazorpayService;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    public function index(RazorpayService $razorpay): JsonResponse
    {
        $settings = Setting::query()->pluck('value', 'key');

        return response()->json([
            'hero_title' => $settings->get('hero_title'),
            'hero_location' => $settings->get('hero_location'),
            'hero_description' => $settings->get('hero_description'),
            'mission_text' => $settings->get('mission_text'),
            'address' => $settings->get('address'),
            'reg_trust_number' => $settings->get('reg_trust_number'),
            'reg_society_number' => $settings->get('reg_society_number'),
            'life_membership_amount' => (float) $settings->get('life_membership_amount', 10000),
            'donation_suggested_amounts' => array_map(
                'intval',
                array_filter(explode(',', (string) $settings->get('donation_suggested_amounts', '')))
            ),
            'razorpay_key_id' => $razorpay->keyId(),
            'razorpay_enabled' => $razorpay->isConfigured(),
        ]);
    }
}
