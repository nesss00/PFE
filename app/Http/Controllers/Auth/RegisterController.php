<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Simulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function create() {
        return inertia('Auth/Register');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => ['required'],
            'username' => ['required'],
            'email' => ['required','unique:users'],
            'password' => ['required'],
        ]);

        if($validated) {
            $newUser = User::create($validated);
            // get the new user's id
            $id = $newUser->id;
            // get the last inserted simualtion
            $lastSimulation = Simulation::latest()->first();
            if ($lastSimulation->user_id == null) {
                $lastSimulationId = $lastSimulation->id;
                // update the user_id of the last inserted simulation
                $lastSimulation->update(['user_id' => $id]);
            }

            Auth::login($newUser);

            return redirect('/dashboard')->with([
                'type' => 'success',
                'message' => 'You are logged in.'
            ]);
        }

        throw ValidationException::withMessages([
            'email' => 'The provide credentials does not match our record.',
        ]);
    }
}
