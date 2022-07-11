@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <x-header-content title="{{ $category->title }}" path="admin.category.index" routeTitle="Назад к списку" btnClasses="btn btn-outline-secondary" /> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <x-show-card 
            title="{{ $category->title }}" 
            :id="$category->id" 
            pathEdit="admin.category.edit"
            pathDelete="admin.category.delete"           
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