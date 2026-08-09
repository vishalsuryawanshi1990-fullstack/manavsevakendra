<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MembershipApplication;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $base = MembershipApplication::query();

        $stats = [
            'total' => (clone $base)->count(),
            'life_membership' => (clone $base)->where('registration_type', 'life_membership')->count(),
            'donation' => (clone $base)->where('registration_type', 'donation')->count(),
            'paid' => (clone $base)->where('payment_status', 'paid')->count(),
            'pending_payment' => (clone $base)->where('payment_status', 'pending')->count(),
            'amount_collected' => (clone $base)->where('payment_status', 'paid')->sum('amount'),
            'pending_review' => (clone $base)->where('status', 'pending')->count(),
        ];

        $recent = (clone $base)->latest()->take(8)->get();

        return view('admin.dashboard', compact('stats', 'recent'));
    }
}
