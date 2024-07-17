<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'simulation_id', 'type_credit_id', // Add other fields as necessary
    ];

    public function simulation()
    {
        return $this->belongsTo(Simulation::class);
    }

    public function typeCredit()
    {
        return $this->belongsTo(TypeCredit::class);
    }
}
