<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatRequest;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\ChatGroup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function index()
    {
        // Fetch chat groups and chats
        $chatGroups = ChatGroup::with('chats')->get();

        // Return the view using Inertia
        return Inertia::render('Chat/Index', [
            'chatGroups' => $chatGroups,
        ]);
    }

    public function store(ChatRequest $request)
    {
        $chatGroupId = $request->input('chat_group_id');
        $chatPrompt = $request->input('chat_prompt');

        // Check if chat group exists
        $chatGroup = ChatGroup::findOrFail($chatGroupId);

        // Create a new chat
        $chat = Chat::create([
            'prompt' => $chatPrompt,
            'status' => 'pending',
        ]);

        // Add chat to the chat group
        $chatGroup->chats()->attach($chat);

        // Process the chat
        $response = $this->processChat($chatPrompt);
        $chat->result = $response['result'];
        $chat->status = 'processed';
        $chat->save();

        // Return success response
        return redirect()->route('chat.index')->with('success', 'Chat added and processed successfully');
    }

    public function addChat(Request $request)
    {
        $chatGroupId = $request->input('chat_group_id');
        $chatPrompt = $request->input('chat_prompt');

        // Validate input
        $validated = $request->validate([
            'chat_group_id' => 'required|exists:chat_groups,id',
            'chat_prompt' => 'required|string',
        ]);

        $chatGroup = ChatGroup::findOrFail($chatGroupId);

        // Create new chat
        $chat = Chat::create([
            'prompt' => $chatPrompt,
            'status' => 'pending',
        ]);

        // Add chat to the chat group
        $chatGroup->chats()->attach($chat);

        // Process the chat
        $response = $this->processChat($chatPrompt);
        $chat->result = $response['result'];
        $chat->status = 'processed';
        $chat->save();

        return redirect()->route('chat.index')->with('success', 'Chat added and processed successfully');
    }

    public function processChat($chatPrompt)
    {
        // Placeholder logic for processing a chat
        // Replace this with actual model invocation logic
        $result = "Processed response for: " . $chatPrompt;

        // Return a simulated response
        return ['result' => $result];
    }

    public function destroy($id)
    {
        $chat = Chat::findOrFail($id);

        // Optionally, you can detach chat from chat groups if needed
        $chat->chatGroups()->detach();

        $chat->delete();

        return redirect()->route('chat.index')->with('success', 'Chat deleted successfully');
    }
}
