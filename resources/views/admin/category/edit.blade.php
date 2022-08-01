@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">     
      <x-header-content title="Форма для редактирования" path="admin.category.index" routeTitle="Назад к списку" btnClasses="btn btn-outline-secondary" /> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <form action={{ route('admin.category.update', $category->id) }} method="POST" enctype="multipart/form-data">
            @csrf
            @method('PATCH')
            <div class="form-group">
              <label for="theme_title">Наименование</label>
              <input type="text" name="title" class="form-control" value="{{ $category->title }}">
              @error('title')
                <small class="form-text text-danger">{{ $message }}</small>                  
              @enderror   
              
              <label>Preview</label>
              <input type="file" name="preview" class="form-control" />
              @error('preview')
                <small class="form-text text-danger">{{ $message }}</small>                  
              @enderror  
            </div>            
            <button type="submit" class="btn btn-primary">Обновить</button>
          </form>
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