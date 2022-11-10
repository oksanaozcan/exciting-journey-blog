<?php

namespace App\Providers;

use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      JsonResource::withoutWrapping();
      Paginator::useBootstrapFive();      

      $categories = Cache::rememberForever('categories', function () {
        return Category::all();
      });
      View::share('categories', $categories);      
    }
}
