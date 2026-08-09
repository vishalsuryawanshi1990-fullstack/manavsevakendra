<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MembershipApplication extends Model
{
    protected $fillable = [
        'full_name',
        'father_or_husband_name',
        'dob',
        'gender',
        'education',
        'occupation',
        'address',
        'taluka',
        'district',
        'pincode',
        'state',
        'mobile',
        'whatsapp',
        'email',
        'landline',
        'aadhar_number',
        'pan_number',
        'blood_group',
        'marital_status',
        'special_skills',
        'how_to_join',
        'photo_path',
        'declaration_accepted',
        'declaration_date',
        'declaration_place',
        'applicant_signature_name',
        'proposer_name',
        'proposer_member_number',
        'proposer_signature_name',
        'proposer_date',
        'seconder_name',
        'seconder_member_number',
        'seconder_signature_name',
        'seconder_date',
        'registration_type',
        'amount',
        'payment_status',
        'razorpay_order_id',
        'razorpay_payment_id',
        'razorpay_signature',
    ];

    protected $casts = [
        'dob' => 'date',
        'declaration_date' => 'date',
        'proposer_date' => 'date',
        'seconder_date' => 'date',
        'office_received_date' => 'date',
        'resolution_date' => 'date',
        'declaration_accepted' => 'boolean',
        'membership_fee' => 'decimal:2',
        'amount' => 'decimal:2',
    ];

    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }
}
