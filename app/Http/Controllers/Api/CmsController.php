<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CmsSection;
use Illuminate\Http\JsonResponse;

class CmsController extends Controller
{
    public function index(): JsonResponse
    {
        $sections = CmsSection::query()->get(['key', 'data'])->pluck('data', 'key');

        return response()->json($sections);
    }
}
