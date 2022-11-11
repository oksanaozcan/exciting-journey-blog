<?php

namespace App\Http\Controllers\Client;

use App\Http\Requests\Client\Article\StoreRequest;
use App\Http\Requests\Client\Article\UpdateRequest;
use Illuminate\Http\Request;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\SingleArticleResource;
use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ArticleController extends BaseDashboardPageController
{    
  public function index()
  {
    $user = auth()->user();
    $adminRole = parent::checkHasAnyRoleAdmin($user);

    $articles = ArticleResource::collection($user->articles);
    $columns = 'articles';  

    $articles_count = $user->articles->count();

    return Inertia::render('Dashboard/Articles/IndexArticle', [
      'admin' => $adminRole,
      'articles' => $articles,
      'current_columns' => $columns,
      'articles_count' => $articles_count
    ]);    
  }
  
  public function create()
  {
    $user = auth()->user();
    $adminRole = parent::checkHasAnyRoleAdmin($user);   

    return Inertia::render('Dashboard/Articles/CreateArticle', [
      'admin' => $adminRole,     
    ]);        
  }
  
  public function store(StoreRequest $request)
  {
    $data = $request->validated();    
    $res = $this->service->store($data);
    
    if ($res) {      
      return Redirect::back()->with('message', 'Article created successfully!');
    }        
  } 
  
  public function edit(Article $article)
  {
    $user = auth()->user();
    $adminRole = parent::checkHasAnyRoleAdmin($user);   

    return Inertia::render('Dashboard/Articles/EditArticle', [
      'admin' => $adminRole,     
      'article' => new SingleArticleResource($article)
    ]);
  }
  
  public function update(UpdateRequest $request, Article $article)
  {
    $data = $request->validated();
    $res = $this->service->update($data, $article);
    
    if ($res) {      
      return Redirect::back()->with('message', 'Article updated successfully!');
    }    
  }
  
  public function delete(Article $article)
  {
    $res = $this->service->delete($article);
    if ($res) {      
      return Redirect::route('dashboard.articles.index')->with('message', 'Article deleted!');
    }        
  }
}
