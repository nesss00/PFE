<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatGroupRequest;
use App\Http\Resources\ChatGroupResource;
use App\Models\ChatGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatGroupController extends Controller
{
    public function create(ChatGroupRequest $request)
    {
        $user = auth()->user();
        $user_id = $user->id;
        // Create a new chat group
        $chatGroup = ChatGroup::create([
            'name' => $request->input('name'),
            'user_id' => $user_id,
        ]);

        return redirect()->back()->with('success', 'Chat Group has been created');
    }
}
