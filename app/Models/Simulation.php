<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Simulation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'date', 'montant_emprunte', 'duree', 'taux_interet',
    ];

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
