<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MembershipApplication;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class RegistrationController extends Controller
{
    public function index(Request $request): View
    {
        $query = MembershipApplication::query()->latest();

        if ($request->filled('type')) {
            $query->where('registration_type', $request->string('type'));
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->string('payment_status'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('q')) {
            $search = $request->string('q');
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('mobile', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('application_number', 'like', "%{$search}%");
            });
        }

        $applications = $query->paginate(20)->withQueryString();

        return view('admin.registrations.index', [
            'applications' => $applications,
            'filters' => $request->only(['type', 'payment_status', 'status', 'q']),
        ]);
    }

    public function show(MembershipApplication $registration): View
    {
        return view('admin.registrations.show', ['application' => $registration]);
    }

    public function update(Request $request, MembershipApplication $registration): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected',
            'rejection_reason' => 'nullable|string|max:255',
            'member_number' => ['nullable', 'string', 'max:255', Rule::unique('membership_applications', 'member_number')->ignore($registration->id)],
            'membership_fee' => 'nullable|numeric|min:0',
            'receipt_number' => 'nullable|string|max:255',
            'board_resolution_number' => 'nullable|string|max:255',
            'resolution_date' => 'nullable|date',
            'office_received_date' => 'nullable|date',
        ]);

        $registration->update($validated);

        return back()->with('status', 'नोंदणी अद्ययावत झाली.');
    }

    public function destroy(MembershipApplication $registration): RedirectResponse
    {
        $registration->delete();

        return redirect()->route('admin.registrations.index')->with('status', 'नोंदणी हटवली.');
    }
}
