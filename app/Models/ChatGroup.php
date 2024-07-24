<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'datetime',
    ];

    public function chats()
    {
        return $this->belongsToMany(Chat::class, 'chat_group_chat', 'chat_group_id', 'chat_id');
    }
}
