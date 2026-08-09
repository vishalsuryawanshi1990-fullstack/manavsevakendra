<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('membership_applications', function (Blueprint $table) {
            $table->id();

            // office-assigned identifiers
            $table->string('application_number')->nullable()->unique();
            $table->string('member_number')->nullable()->unique();

            // 1-13: अर्जदाराची माहिती
            $table->string('full_name');
            $table->string('father_or_husband_name');
            $table->date('dob');
            $table->enum('gender', ['पुरुष', 'महिला', 'इतर']);
            $table->string('education');
            $table->string('occupation')->nullable();
            $table->text('address');
            $table->string('taluka');
            $table->string('district');
            $table->string('pincode', 10);
            $table->string('state')->default('महाराष्ट्र');
            $table->string('mobile', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email');
            $table->string('landline', 20)->nullable();
            $table->string('aadhar_number', 20)->nullable();
            $table->string('pan_number', 10)->nullable();
            $table->string('blood_group', 5)->nullable();
            $table->enum('marital_status', ['विवाहित', 'अविवाहित'])->nullable();
            $table->string('special_skills')->nullable();
            $table->string('how_to_join')->nullable();
            $table->string('photo_path')->nullable();

            // घोषणा
            $table->boolean('declaration_accepted')->default(false);
            $table->date('declaration_date')->nullable();
            $table->string('declaration_place')->nullable();
            $table->string('applicant_signature_name')->nullable();

            // प्रस्तावक (Proposer)
            $table->string('proposer_name')->nullable();
            $table->string('proposer_member_number')->nullable();
            $table->string('proposer_signature_name')->nullable();
            $table->date('proposer_date')->nullable();

            // अनुमोदक (Seconder)
            $table->string('seconder_name')->nullable();
            $table->string('seconder_member_number')->nullable();
            $table->string('seconder_signature_name')->nullable();
            $table->date('seconder_date')->nullable();

            // कार्यालयीन वापरासाठी (office use only — set later by staff, not via public form)
            $table->date('office_received_date')->nullable();
            $table->decimal('membership_fee', 10, 2)->nullable();
            $table->string('receipt_number')->nullable();
            $table->string('board_resolution_number')->nullable();
            $table->date('resolution_date')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('rejection_reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_applications');
    }
};
