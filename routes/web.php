<?php

use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('items', ItemController::class);
Route::get('/items/trashed', [ItemController::class, 'trashed']);
Route::put('/items/restore/{id}', [ItemController::class, 'restore']);
Route::delete('/items/force-delete/{id}', [ItemController::class, 'forceDelete']);