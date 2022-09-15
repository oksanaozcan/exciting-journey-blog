<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Client\ArticleController;
use App\Http\Controllers\Client\ArticlePageController;
use App\Http\Controllers\Client\CategoryPageController;
use App\Http\Controllers\Client\CommentController;
use App\Http\Controllers\Client\DashboardPageController;
use App\Http\Controllers\Client\FollowUserController;
use App\Http\Controllers\Client\PostPageController;
use App\Http\Controllers\Client\PostUserLikeController;
use App\Http\Controllers\Client\PublicUserInfoPageController;
use App\Http\Controllers\Client\TagPageController;
use App\Http\Controllers\Client\UserController as ClientUserController;
use App\Http\Controllers\Client\WelcomePageController;
use App\Types\PermissionType;
use Illuminate\Support\Facades\Route;

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

Route::prefix('articles')->group(function () {
  Route::get('/', [ArticlePageController::class, 'index'])->name('client.article.index'); 
  Route::get('/subscribers', [ArticlePageController::class, 'indexSubscribers'])->middleware(['auth', 'verified'])->name('article.subscribers');
  Route::get('/{article}', [ArticlePageController::class, 'show'])->name('client.article.show');
  Route::get('/author/{user}', [ArticlePageController::class, 'indexFromUser'])->name('client.article.index.from.user');  
});

Route::middleware(['auth', 'verified'])->group(function () {  
  
  Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardPageController::class, 'index'])->name('dashboard');
    Route::get('/edit-profile', [DashboardPageController::class, 'edit'])->name('edit.profile');
    Route::get('/communication', [DashboardPageController::class, 'communication'])->name('communication');
    Route::get('/liked-posts', [DashboardPageController::class, 'likedPosts'])->name('dashboard.liked.posts'); 
    Route::get('/liked-articles', [DashboardPageController::class, 'likedArticles'])->name('dashboard.liked.articles'); 
    Route::get('/my-followings', [DashboardPageController::class, 'followings'])->name('dashboard.followings'); 
    Route::get('/my-followers', [DashboardPageController::class, 'followers'])->name('dashboard.followers'); 
    
    Route::prefix('my-articles')->group(function () {
      Route::get('/', [ArticleController::class, 'index'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.index');     
      Route::get('/create', [ArticleController::class, 'create'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.create'); 
      Route::post('/', [ArticleController::class, 'store'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.store'); 
      Route::get('/{article}/edit', [ArticleController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.edit'); 
      Route::post('/{article}/update', [ArticleController::class, 'update'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.update'); 
      Route::delete('/{article}', [ArticleController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('dashboard.articles.delete'); 
    });    
       
    Route::get('/account-security', [DashboardPageController::class, 'accountSecurity'])->name('dashboard.edit.password');        
    Route::patch('/{user}', [ClientUserController::class, 'update'])->name('update.user.public.info');
    Route::post('/{user}', [ClientUserController::class, 'updatePassword'])->name('client.update.user.password');
  });

  Route::prefix('comments')->group(function () {
    Route::post('/', [CommentController::class, 'store'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('client.comment.store');
  });

  Route::prefix('likes')->group(function () {
    Route::post('/{post}', [PostUserLikeController::class, 'toggleLike'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('client.like.toggle');
    Route::post('/article/{article}', [PostUserLikeController::class, 'toggleLikeArticle'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('client.article.like.toggle');
  });

  Route::post('/follow/{user}', [FollowUserController::class, 'follow'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('user.follow');
  Route::post('/unfollow/{user}', [FollowUserController::class, 'unfollow'])->middleware(['can:'.PermissionType::CAN_COMMENT_POST])->name('user.unfollow');  
  Route::get('/public-profile/{user}', [PublicUserInfoPageController::class, 'show'])->name('user.public.profile.show');

  Route::prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.index');

    Route::prefix('users')->group(function () {
      Route::get('/', [UserController::class, 'index'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.index');      
      Route::get('/deleted', [UserController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.deleted');
      Route::get('/readers', [UserController::class, 'indexReaders'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.user.reader');
      Route::get('/banned-readers', [UserController::class, 'indexBanned'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.user.banned');
      Route::get('/{user}', [UserController::class, 'show'])->middleware(['can:'.PermissionType::CAN_DELETE_USER])->name('admin.user.show');
      Route::get('/{user}/writer', [UserController::class, 'showAsWriter'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.showAsWriter');
      Route::get('/{user}/edit', [UserController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_CREATE_USER])->name('admin.user.edit');
      Route::get('/readers/{user}/edit', [UserController::class, 'editReader'])->middleware(['can:'.PermissionType::CAN_UPDATE_USER])->name('admin.user.edit.reader');
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
      Route::get('/deleted', [PostController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_DELETE_POST])->name('admin.post.deleted');
      Route::get('/create', [PostController::class, 'create'])->middleware(['can:'.PermissionType::CAN_CREATE_POST])->name('admin.post.create');            
      Route::post('/', [PostController::class, 'store'])->middleware(['can:'.PermissionType::CAN_CREATE_POST])->name('admin.post.store');
      Route::get('/{post}', [PostController::class, 'show'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.show');
      Route::get('/{post}/edit', [PostController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.edit');
      Route::post('/{post}', [PostController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_POST])->name('admin.post.update');
      Route::delete('/{post}', [PostController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_DELETE_POST])->name('admin.post.delete');
    });    

    Route::prefix('comments')->group(function () {
      Route::get('/', [AdminCommentController::class, 'index'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.index');
      Route::get('/deleted', [AdminCommentController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.deleted');     
      Route::get('/{comment}', [AdminCommentController::class, 'show'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.show');
      Route::get('/{comment}/edit', [AdminCommentController::class, 'edit'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.edit');
      Route::patch('/{comment}', [AdminCommentController::class, 'update'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.update');
      Route::delete('/{comment}', [AdminCommentController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.comment.delete');
    });

    Route::prefix('articles')->group(function () {
      Route::get('/', [AdminArticleController::class, 'index'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.article.index');
      Route::get('/deleted', [AdminArticleController::class, 'indexDeleted'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.article.deleted');
      Route::delete('/{article}', [AdminArticleController::class, 'delete'])->middleware(['can:'.PermissionType::CAN_UPDATE_COMMENT])->name('admin.article.delete');
    });

  });

});

require __DIR__.'/auth.php';
