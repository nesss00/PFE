<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCredit extends Model
{
    protected $fillable = [
        'name',
        'TypeCredit',
        'TauxInteret',
        'DuréeMax',
        'institution_id', // Ensure this column exists in your database
    ];

    use HasFactory;

    public function institution() {
        return $this->belongsTo(Institution::class);
    }
}
