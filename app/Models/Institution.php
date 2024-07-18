<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    protected $fillable = [
        'name',
        'type',
    ];

    protected $casts = [
        'type' => 'string',
    ];

    use HasFactory;

    public function typeCredits(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TypeCredit::class);
    }

    protected static function boot() {
        parent::boot();

        static::saving(function ($model) {
            $validTypes = ['Banque', 'BMF', 'ONG'];
            if (!in_array($model->type, $validTypes)) {
                throw new \Exception("Invalid type. Must be one of: " . implode(", ", $validTypes));
            }
        });
    }
}
