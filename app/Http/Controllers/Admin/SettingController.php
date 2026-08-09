<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SettingController extends Controller
{
    public function edit(): View
    {
        return view('admin.settings.edit', [
            'settings' => Setting::query()->orderBy('key')->get()->keyBy('key'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_location' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string|max:2000',
            'mission_text' => 'nullable|string|max:2000',
            'address' => 'nullable|string|max:1000',
            'reg_trust_number' => 'nullable|string|max:255',
            'reg_society_number' => 'nullable|string|max:255',
            'life_membership_amount' => 'required|numeric|min:1',
            'donation_suggested_amounts' => 'nullable|string|max:255',
        ]);

        foreach ($validated as $key => $value) {
            Setting::set($key, (string) $value);
        }

        return back()->with('status', 'सेटिंग्स जतन झाल्या.');
    }
}
