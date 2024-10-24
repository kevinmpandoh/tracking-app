<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\DocumentController;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TrackingStepController;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\User;


Route::get('/', function (Request $request) {

    $search = $request->input('search'); // Ambil input search dari user
    $document = null;


    if ($search) {
        // Cari dokumen berdasarkan nomor dokumen
        $document = Document::where('document_number', $search)
            ->with(['trackingSteps' => function ($query) {
                $query->orderBy('step_number', 'asc'); // Urutkan tracking steps berdasarkan urutan
            }])->first();
    }



    return Inertia::render('Homepage', [
        'document' => $document,
        'search' => $search,
    ]);
})->name('homepage');





Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {

        // Ambil seluruh data user dan seluruh dokumen
        $documents = Document::count();
        $users = User::count();




        return Inertia::render('Dashboard', ['documents' => $documents, 'users' => $users]);
    })->name('dashboard');


    Route::get('/kelola-berkas', function () {
        return Inertia::render("KelolaBerkas");
    });

    Route::get('/kelola-berkas', [DocumentController::class, 'index'])->name('documents.index');
    Route::post('/kelola-berkas', [DocumentController::class, 'store'])->name('documents.store');
    Route::patch('/kelola-berkas/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('/kelola-berkas/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    // Tracking Step
    Route::post('/tracking-steps/{document}', [TrackingStepController::class, 'updateStep'])->name('tracking-steps.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Role
    Route::get('/role', [RoleController::class, 'index'])->name('role.index');
    Route::post('/role', [RoleController::class, 'store'])->name('role.store');
    Route::put('/role/{role}', [RoleController::class, 'update'])->name('role.update');
    Route::delete('/role/{role}', [RoleController::class, 'destroy'])->name('role.destroy');
});


require __DIR__ . '/auth.php';
