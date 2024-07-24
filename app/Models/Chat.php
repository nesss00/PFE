<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'prompt',
        'datetime',
        'result',
        'technical_result',
        'status',
        'times_prompted',
    ];

    protected $casts = [
        'technical_result' => 'array',
    ];

    public function chatGroups()
    {
        return $this->belongsToMany(ChatGroup::class, 'chat_group_chat', 'chat_id', 'chat_group_id');
    }
}
