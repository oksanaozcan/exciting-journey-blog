@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  <x-header-content title="Теги" path="admin.tag.create" /> 
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Наименование', 'Дата создания', 'Кол-во постов', 'Действия']">
            @foreach ($tags as $item)
              <tr>
                <th>{{ $item->title }}</th>                         
                <td>{{ $item->created_at }}</td>               
                <td>#####</td>               
                <td class="d-flex">
                  <x-ui.show-btn path='admin.tag.show' :id="$item->id" >Смотреть</x-ui.show-btn>               
                  <x-ui.edit-btn path='admin.tag.edit' :id="$item->id" >Изменить</x-ui.show-btn>                   
                  <x-ui.delete-btn path='admin.tag.delete' :id="$item->id" />                  
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>   
      <div> React component  </div>
    </div> 
    
@endsection