<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'create']);

    Route::post('/users/{user}/follow', [UserController::class, 'follow']);
    Route::get('/users/suggestions', [UserController::class, 'suggestions']);

    Route::post('/logout', [AuthController::class, 'logout']);

});