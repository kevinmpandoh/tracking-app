<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\TrackingStep;
use Illuminate\Support\Facades\Auth;

class TrackingStepController extends Controller
{
    /**
     * Update tracking step status oleh role tertentu (setuju atau tolak).
     */
    public function updateStep(Request $request, $documentId)
    {


        $request->validate([
            'status' => 'required|in:completed,rejected',
            'rejected_note' => 'nullable|string',
            'title' => 'required',
        ]);

        $user = Auth::user();
        $document = Document::findOrFail($documentId);

        // Mendapatkan tracking step yang sedang diproses oleh role ini
        $currentStep = TrackingStep::where('document_id', $document->id)
            ->where('role_id', $user->role_id)
            ->where('status', 'inprogress')
            ->firstOrFail();



        // Update status step ini
        $currentStep->status = $request->status;
        $currentStep->processed_by = $user->id;
        $currentStep->title = $request->title;
        if ($request->status == 'rejected') {
            $currentStep->rejected_note = $request->rejected_note;

            // Jika step ditolak, ubah step sebelumnya menjadi inprogress
            $previousStep = TrackingStep::where('document_id', $document->id)
                ->where('step_number', $currentStep->step_number - 1)
                ->first();

            if ($previousStep) {
                $previousStep->status = 'inprogress';
                $previousStep->title = $this->getStepTitle($previousStep->step_number);
                $previousStep->rejected_note = $request->rejected_note;
                $previousStep->save();
            }
        }
        $currentStep->save();

        // Jika step disetujui, lanjutkan ke step berikutnya
        if ($request->status == 'completed' && $currentStep->step_number < 10) {

            $nextStepNumber = $currentStep->step_number + 1;

            $nextRoleId = $this->getNextRoleId($nextStepNumber); // Fungsi untuk mendapatkan role ID selanjutnya

            // cek jika ada step selanjutnya yang ditolak maka step selanjutnya akan dihapus
            $nextStep = TrackingStep::where('document_id', $document->id)
                ->where('step_number', $nextStepNumber)
                ->where('status', 'rejected')
                ->first();

            if ($nextStep) {
                $nextStep->delete();
            }

            TrackingStep::create([
                'document_id' => $document->id,
                'step_number' => $nextStepNumber,
                'processed_by' => null,
                'title' => $this->getStepTitle($nextStepNumber), // Fungsi untuk mendapatkan title step
                'role_id' => $nextRoleId,
                'status' => 'inprogress',
            ]);
        }

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dibuat.');
    }

    /**
     * Dapatkan role ID untuk step selanjutnya.
     */
    private function getNextRoleId($stepNumber)
    {
        // Contoh urutan role berdasarkan step_number:
        $roles = [
            1 => 1, // Petugas Loket
            2 => 2, // Peneliti Dokumen
            3 => 3, // Peneliti Pajak
            4 => 4, // Kasubid Kasda
            5 => 5, // Kasubid Belanja
            6 => 6, // Jabatan Fungsional
            7 => 7, // BUD/Kuasa BUD
            8 => 2, // Peneliti Dokumen
            9 => 7, // BUD/Kuasa BUD
        ];

        return $roles[$stepNumber] ?? null;
    }

    /**
     * Dapatkan title untuk step tertentu.
     */
    private function getStepTitle($stepNumber)
    {
        // Contoh title berdasarkan step_number:
        $titles = [
            2 => 'Berkas sedang diperiksa oleh Peneliti Dokumen',
            3 => 'Berkas sedang diperiksa oleh Peneliti Pajak',
            4 => 'Berkas sedang diperiksa oleh Kasubid Kasda',
            5 => 'Berkas sedang diperiksa oleh Kasubid Belanja',
            6 => 'Berkas sedang diperiksa oleh Jabatan Fungsional',
            7 => 'Berkas sedang diperiksa oleh BUD/Kuasa BUD',
            8 => 'Peneliti Dokumen sedang mencetak SP2D',
            9 => 'BUD/Kuasa BUD sedang menandatangani SP2D',
            10 => 'Surat perintah pencairan dana (SP2D) telah dikirim ke bank',
        ];

        return $titles[$stepNumber] ?? 'Proses Tidak Diketahui';
    }
}
