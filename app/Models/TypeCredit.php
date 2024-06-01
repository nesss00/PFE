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
    ];

    use HasFactory;
}
