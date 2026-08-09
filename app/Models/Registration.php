<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'full_name',
        'father_name',
        'dob',
        'gender',
        'qualification',
        'address',
        'taluka',
        'district',
        'pincode',
        'state',
        'mobile',
        'alternate_number',
        'email',
        'aadhaar',
        'status',
        'special_skills',
        'why_join',
        'proposer_name',
        'proposer_member_id',
        'seconder_name',
        'seconder_member_id',
    ];
}
