<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('father_name');
            $table->string('dob');
            $table->string('gender');
            $table->string('qualification');
            $table->text('address');
            $table->string('taluka');
            $table->string('district');
            $table->string('pincode');
            $table->string('state');
            $table->string('mobile');
            $table->string('alternate_number')->nullable();
            $table->string('email');
            $table->string('aadhaar');
            $table->string('status');
            $table->text('special_skills')->nullable();
            $table->text('why_join')->nullable();
            $table->string('proposer_name')->nullable();
            $table->string('proposer_member_id')->nullable();
            $table->string('seconder_name')->nullable();
            $table->string('seconder_member_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
