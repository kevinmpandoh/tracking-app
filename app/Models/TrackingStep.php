<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class TrackingStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'step_number',
        'title',
        'status',
        'processed_by',
        'rejected_note',
        'role_id',
    ];

    // Relasi ke tabel Document
    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    // Relasi ke tabel User (yang memproses step ini)
    public function processedBy()
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    // Relasi ke tabel Role (role yang berhak memproses step ini)
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
