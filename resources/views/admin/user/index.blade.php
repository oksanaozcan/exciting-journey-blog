@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  <x-header-content title="Пользователи" path="admin.index" routeTitle="В админ панель" btnClasses="btn btn-outline-secondary" /> 
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Имя','Email','Дата регистрации', 'Роль', 'Комментарии', 'Посты', 'Статьи', 'Действия']">
            @foreach ($users as $item)
              <tr>
                <th>{{ $item->name }}</th>
                <td>{{ $item->email }}</td>                
                <td>{{ $item->created_at }}</td>               
                <td>
                  @foreach ($item->roles as $role)
                  <li class="list-group-item">{{ $role->name }}</li>                      
                  @endforeach
                </td>               
                <td>{{ $item->comments->count() }}</td>               
                <td>{{ $item->posts->count() }}</td>               
                <td>{{ $item->articles->count() }}</td>               
                <td class="d-flex">
                  <x-ui.show-btn path='admin.user.show' :id="$item->id" >Смотреть</x-ui.show-btn>               
                  <x-ui.edit-btn path='admin.user.edit' :id="$item->id" >Изменить</x-ui.show-btn>                   
                  <x-ui.delete-btn path='admin.user.delete' :id="$item->id" />                  
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     
    </div> 
    
@endsection