<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Document;

class ArsipController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $documents = Document::where('is_archived', true)->paginate(10) // Ganti 10 dengan jumlah item per halaman
            ->appends(['search' => $search]);


        return Inertia::render('Arsip/index', ['documents' => $documents, 'search' => $search]);
    }
}
