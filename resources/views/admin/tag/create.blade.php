@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">      
      <x-header-content title="Форма для добавления тега" path="admin.tag.index" routeTitle="Назад к списку" btnClasses="btn btn-outline-secondary"/> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <form action={{ route('admin.tag.store') }} method="POST">
            @csrf
            <div class="form-group">
              <label>Наименование</label>
              <input type="text" name="title" class="form-control" placeholder="Введите наименование" value="{{ old('title') }}">
              @error('title')
                <small class="form-text text-danger">{{ $message }}</small>                  
              @enderror              
            </div>                        
            <button type="submit" class="btn btn-primary">Добавить</button>
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