<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Client\CategoryPageController;
use App\Http\Controllers\Client\CommentController;
use App\Http\Controllers\Client\PostPageController;
use App\Http\Controllers\Client\TagPageController;
use App\Http\Controllers\Client\WelcomePageController;
use App\Types\PermissionType;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomePageController::class, 'index'])->name('main');

Route::prefix('posts')->group(function () {
  Route::get('/', [PostPageController::class, 'index'])->name('client.post.index');  
  Route::get('/{post}', [PostPageController::class, 'show'])->name('client.post.show');  
});

Route::prefix('categories')->group(function () {
  Route::get('/', [CategoryPageController::class, 'index'])->name('client.category.index');  
  Route::get('/{category}', [CategoryPageController::class, 'show'])->name('client.category.show');
});

Route::prefix('tags')->group(function () {
  Route::get('/', [TagPageController::class, 'index'])->name('client.tag.index');  
  Route::get('/{tag}', [TagPageController::class, 'show'])->name('client.tag.show');  
});

Route::middleware(['auth', 'verified'])->group(function () {
  
  Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::prefix('comments')->group(function () {
    Route::post('/', [CommentController::class, 'store'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('client.comment.store');
  });

  Route::prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.index');

    Route::prefix('users')->group(function () {
      Route::get('/', [UserController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.index');
      Route::get('/deleted', [UserController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.deleted');
      Route::get('/{user}', [UserController::class, 'show'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.show');
      Route::get('/{user}/edit', [UserController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.user.edit');
      Route::patch('/{user}', [UserController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.user.update');
      Route::delete('/{user}', [UserController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_DELETE_USER])->name('admin.user.delete');
    });

    Route::prefix('categories')->group(function () {
      Route::get('/', [CategoryController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.category.index');
      Route::get('/deleted', [CategoryController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.category.deleted');
      Route::get('/create', [CategoryController::class, 'create'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.category.create');
      Route::post('/store', [CategoryController::class, 'store'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.category.store');
      Route::get('/{category}', [CategoryController::class, 'show'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.category.show');
      Route::get('/{category}/edit', [CategoryController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.category.edit');
      Route::patch('/{category}', [CategoryController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.category.update');
      Route::delete('/{category}', [CategoryController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_DELETE_USER])->name('admin.category.delete');
    });

    Route::prefix('tags')->group(function () {
      Route::get('/', [TagController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.tag.index');
      Route::get('/deleted', [TagController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.tag.deleted');
      Route::get('/create', [TagController::class, 'create'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.tag.create');
      Route::post('/store', [TagController::class, 'store'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.tag.store');
      Route::get('/{tag}', [TagController::class, 'show'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.tag.show');
      Route::get('/{tag}/edit', [TagController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.tag.edit');
      Route::patch('/{tag}', [TagController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.tag.update');
      Route::delete('/{tag}', [TagController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_DELETE_USER])->name('admin.tag.delete');
    });

    Route::prefix('posts')->group(function () {
      Route::get('/', [PostController::class, 'index'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.index');
      Route::get('/create', [PostController::class, 'create'])->middleware(['can:'.PermissionType::CAN_CREATE_POST])->name('admin.post.create');
      Route::post('/', [PostController::class, 'store'])->middleware(['can:'.PermissionType::CAN_CREATE_POST])->name('admin.post.store');
      Route::get('/{post}/edit', [PostController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.edit');
      Route::post('/{post}', [PostController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.update');
    });
    

  });

});

require __DIR__.'/auth.php';
