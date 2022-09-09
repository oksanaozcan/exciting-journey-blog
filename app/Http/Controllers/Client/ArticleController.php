<?php

namespace App\Http\Controllers\Client;

use Illuminate\Http\Request;
use App\Http\Resources\ArticleResource;
use Inertia\Inertia;

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
  
  public function store(Request $request)
  {
      //
  }
  
  public function show($id)
  {
      //
  }
  
  public function edit($id)
  {
      //
  }
  
  public function update(Request $request, $id)
  {
      //
  }
  
  public function destroy($id)
  {
      //
  }
}
