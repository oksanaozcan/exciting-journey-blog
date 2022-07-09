<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Types\PermissionType;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/admin', [AdminController::class, 'index'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.index');
Route::get('/admin/users', [UserController::class, 'index'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.index');
Route::get('/admin/users/deleted', [UserController::class, 'indexDeleted'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.deleted');
Route::get('/admin/users/{user}', [UserController::class, 'show'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.show');
Route::get('/admin/users/{user}/edit', [UserController::class, 'edit'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.edit');
Route::patch('/admin/users/{user}', [UserController::class, 'update'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.update');
Route::delete('/admin/users/{user}', [UserController::class, 'delete'])->middleware(['auth', 'can:'.PermissionType::CAN_CREATE_USER, ])->name('admin.user.delete');

require __DIR__.'/auth.php';
