@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <x-header-content title="{{ $user->name }}" path="admin.user.index" routeTitle="Назад к списку" btnClasses="btn btn-outline-secondary" /> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <x-show-card 
            title="{{ $user->name }}" 
            :id="$user->id" 
            :text="[$user->email]" 
            :list="['created at '.$user->created_at, 'comments: '.$user->comments->count(), 'Post published: '.$user->posts->count()]" 
            pathEdit="admin.user.edit"
            pathDelete="admin.user.delete"       
          />        
          <h4>Active Roles: </h4>   
          @foreach ($user->roles as $role)
            <li class="list-group-item">{{ $role->name }}</li>              
          @endforeach
        </div>       
      </div>
      <div class="row mb-2">
        <h2>Comments of {{ $user->name }}</h2>
        <ul>
          @foreach ($comments as $comment)
             <li><a href="{{ route('client.post.show', $comment->post_id) }}">{{ $comment->message }}</a></li>       
          @endforeach
        </ul>        
      </div>
      <div class="row mb-2">
        {{ $comments->links() }}
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