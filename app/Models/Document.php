<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'document_number', 'created_by'];

    // Relasi ke tracking steps
    public function trackingSteps()
    {
        return $this->hasMany(TrackingStep::class);
    }

    // Ambil tracking step terakhir
    public function latestTrackingStep()
    {
        return $this->hasOne(TrackingStep::class)->latestOfMany(); // Mengambil step terakhir
    }
}
