<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('auth', [AuthController::class, 'auth']);
Route::resource('product', ProductController::class);
Route::resource('banner', BannerController::class);
Route::resource('product-type', ProductTypeController::class);
Route::resource('profile', ProfileController::class);
Route::post('/send-order-email', [OrderController::class, 'sendEmail']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
});
