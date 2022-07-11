@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  <x-header-content title="Категории" path="admin.category.create" /> 
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Наименование', 'Дата создания', 'Кол-во постов', 'Действия']">
            @foreach ($categories as $item)
              <tr>
                <th>{{ $item->title }}</th>                         
                <td>{{ $item->created_at }}</td>               
                <td>#####</td>               
                <td class="d-flex">
                  <x-ui.show-btn path='admin.category.show' :id="$item->id" >Смотреть</x-ui.show-btn>               
                  <x-ui.edit-btn path='admin.category.edit' :id="$item->id" >Изменить</x-ui.show-btn>                   
                  <x-ui.delete-btn path='admin.category.delete' :id="$item->id" />                  
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     
    </div> 
    
@endsection