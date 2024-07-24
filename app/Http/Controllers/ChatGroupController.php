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
        $chatGroup = ChatGroup::create($request->validated());

        return redirect()->back()->with('success', 'Chat Group has been created');
    }
}
