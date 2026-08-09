<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('membership_applications', function (Blueprint $table) {
            $table->enum('registration_type', ['life_membership', 'donation'])
                ->default('life_membership')
                ->after('member_number');
            $table->decimal('amount', 10, 2)->nullable()->after('registration_type');
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending')->after('amount');
            $table->string('razorpay_order_id')->nullable()->after('payment_status');
            $table->string('razorpay_payment_id')->nullable()->after('razorpay_order_id');
            $table->string('razorpay_signature')->nullable()->after('razorpay_payment_id');
        });
    }

    public function down(): void
    {
        Schema::table('membership_applications', function (Blueprint $table) {
            $table->dropColumn([
                'registration_type',
                'amount',
                'payment_status',
                'razorpay_order_id',
                'razorpay_payment_id',
                'razorpay_signature',
            ]);
        });
    }
};
