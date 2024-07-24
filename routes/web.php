<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatGroupController;
use App\Http\Controllers\CreditSimulationController;
use App\Http\Controllers\CreditSimulationUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TypeCreditController;
use App\Http\Controllers\SimulationController;
use App\Http\Controllers\InstitutionController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
    Route::apiResource('users', UserController::class);
    Route::apiResource('typecredit', TypeCreditController::class);
    Route::apiResource('simulation', SimulationController::class);
    Route::apiResource('institution', InstitutionController::class);
    Route::post('simulateuser', [CreditSimulationUserController::class, 'simulateuser'])->name('simulateuser');

    Route::get('profile', ProfileController::class)->name('profile');

    // Chat and ChatGroup routes
    Route::get('chat', [ChatController::class, 'index'])->name('chat.index');
    Route::post('chat/store', [ChatController::class, 'store'])->name('chat.store');
    Route::post('chat/add-chat', [ChatController::class, 'addChat'])->name('chat.add');
    Route::delete('chat/{id}', [ChatController::class, 'destroy'])->name('chat.destroy');
    Route::post('chat/create', [ChatGroupController::class, 'create'])->name('chat.create');
    Route::post('chat/add-chat-to-group', [ChatGroupController::class, 'addChat'])->name('chat.addChatToGroup');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);

    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    Route::post('simulate', [CreditSimulationController::class, 'simulate'])->name('simulate');

    Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);
});
