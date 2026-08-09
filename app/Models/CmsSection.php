<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsSection extends Model
{
    protected $fillable = ['key', 'label', 'data'];

    protected $casts = [
        'data' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'key';
    }
}
