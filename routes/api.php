<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('banner', BannerController::class);
Route::resource('product-type', ProductTypeController::class);
Route::resource('product', ProductController::class);
Route::resource('profile', ProfileController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
