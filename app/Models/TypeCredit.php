<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeCredit extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'TypeCredit',
        'TauxInteret',
        'DuréeMax',
        'institution_id', // Ensure this column exists in your database
    ];


    public function institution(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }
}
