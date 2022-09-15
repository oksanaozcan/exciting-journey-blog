<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
  public function index()
  {
    $articles = Article::all();    
    return view('admin.article.index', compact('articles'));
  }

  public function indexDeleted()
  {
    $trashedArticles = Article::onlyTrashed()->get();
    return view('admin.article.deleted', compact('trashedArticles'));
  }    
  
  public function delete(Article $article)
  {
    $article->delete();
    return redirect()->route('admin.article.index');    
  } 
}
