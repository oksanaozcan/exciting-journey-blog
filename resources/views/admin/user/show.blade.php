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
            :text="[$user->roles->pluck('name')[0], $user->email]" 
            :list="[$user->created_at, 'value of comment', 'value of posts', 'etc']" 
          />           
        </div>
        <div class="col-sm-6 mt-2">
          
        </div>
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