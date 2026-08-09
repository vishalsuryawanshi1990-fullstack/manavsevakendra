<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CmsSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CmsController extends Controller
{
    public function index(): View
    {
        return view('admin.cms.index', ['sections' => CmsSection::query()->orderBy('label')->get()]);
    }

    public function edit(CmsSection $section): View
    {
        return view('admin.cms.edit', [
            'section' => $section,
            'json' => json_encode($section->data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
    }

    public function update(Request $request, CmsSection $section): RedirectResponse
    {
        $validated = $request->validate([
            'data_json' => 'required|string',
        ]);

        $decoded = json_decode($validated['data_json'], true);

        if (json_last_error() !== JSON_ERROR_NONE || ! is_array($decoded)) {
            return back()
                ->withErrors(['data_json' => 'अवैध JSON: '.json_last_error_msg()])
                ->withInput();
        }

        $section->update(['data' => $decoded]);

        return redirect()->route('admin.cms.edit', $section)->with('status', "'{$section->label}' अद्ययावत झाले.");
    }
}
