@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <x-header-content 
        title="{{ $user->name }}" 
        path="admin.index" 
        routeTitle="Назад" 
        btnClasses="btn btn-outline-secondary" 
      /> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <h2>Posts</h2>
          <ul>
          @foreach ($posts as $post)
            <li><a href="{{ route('client.post.show', $post->id) }}">{{ $post->title }}</a></li>              
          @endforeach
          </ul>         
        </div>
        <div class="col-sm-6 mt-2">          
        </div>
      </div>
      <div class="row mb-2">
        {{ $posts->links() }}
      </div>
    </div>
  </div>  

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">     
      <div class="row">

      </div>     
    </div>   
@endsection