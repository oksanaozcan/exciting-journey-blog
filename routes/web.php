<?php

use App\Http\Controllers\Admin\AdminController;
use App\Types\PermissionType;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/admin', [AdminController::class, 'index'])->middleware(['auth', 'can:create-user'])->name('admin.index');

require __DIR__.'/auth.php';
