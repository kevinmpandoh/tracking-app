<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\TrackingStep;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DocumentController extends Controller
{

    /**
     * Menampilkan semua dokumen.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $userRoleId = Auth::user()->role_id;
        $userRoleName = Auth::user()->role->keterangan;

        $documents = Document::query()
            ->select('documents.*', 'users.name as created_by', 'tracking_steps.status as tracking_status', 'tracking_steps.rejected_note as catatan') // Select kolom yang akan ditampilkan
            ->join('users', 'documents.created_by', '=', 'users.id')
            ->join('tracking_steps', 'documents.id', '=', 'tracking_steps.document_id') // Join dengan tracking_steps
            ->where('tracking_steps.status', 'inprogress'); // Hanya ambil status inprogress
        // Jika bukan admin, filter berdasarkan role dan status
        if ($userRoleName !== "Admin") { // Misalnya admin memiliki role_id = 1
            $documents->where('tracking_steps.role_id', $userRoleId); // Filter berdasarkan role

        }
        // Tambahkan filter pencarian
        $documents->where(function ($query) use ($search) {
            $query->where('documents.document_number', 'like', "%{$search}%")
                ->orWhere('documents.name', 'like', "%{$search}%");
        });
        // Paginate hasil
        $documents = $documents->paginate(20)->appends(['search' => $search]);

        // return response()->json($documents);


        return Inertia::render('Berkas/KelolaBerkas', ['documents' => $documents, 'search' => $search]);
    }

    /**
     * Menyimpan dokumen baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'document_number' => 'required|unique:documents',
            'name' => 'required',
        ]);

        // Petugas Loket yang membuat dokumen (user yang sedang login)
        $user = Auth::user();

        // Membuat dokumen
        $document = Document::create([
            'document_number' => $request->document_number,
            'name' => $request->name,
            'created_by' => $user->id, // UUID user
        ]);

        // Menambahkan tracking step pertama (Diterima oleh Petugas Loket)
        TrackingStep::create([
            'document_id' => $document->id,
            'step_number' => 1,
            'title' => 'Dokumen sedang diajukan oleh Petugas Loket',
            'status' => 'inprogress',
            'processed_by' => $user->id,
            'role_id' => $user->role_id,
        ]);

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dibuat.');
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'document_number' => 'required|unique:documents,document_number,' . $document->id,
            'name' => 'required',
        ]);

        $document->update([
            'document_number' => $request->document_number,
            'name' => $request->name,
        ]);

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(Document $document)
    {
        $document->delete();

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dihapus.');
    }
}
