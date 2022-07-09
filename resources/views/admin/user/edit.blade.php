@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">     
      <x-header-content title="Изменение роли" path="admin.user.index" routeTitle="Назад к списку" btnClasses="btn btn-outline-secondary" /> 
      <div class="row mb-2">
        <div class="col-sm-6 mt-2">
          <form action={{ route('admin.user.update', $user->id) }} method="POST">
            @csrf
            @method('PATCH')

            <div class="form-group">
              <label>Выберите роль:</label>
              <select class="form-select form-control" name="role">      
                @foreach ($roles as $role)
                  <option value={{ $role->name }} 
                    {{ $user->roles->pluck('id')[0] == $role->id ? ' selected' : '' }}
                  >
                    {{ $role->name }}
                  </option>                        
                @endforeach                                       
              </select>
              @error('role')
                <small class="form-text text-danger">{{ $message }}</small>                  
              @enderror  
            </div>       
              
            <button type="submit" class="btn btn-primary">Назначить</button>
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