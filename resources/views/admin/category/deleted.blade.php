@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  <x-header-content title="Удаленные Категории" path="admin.category.index" routeTitle="Активные категории" btnClasses="btn btn-outline-secondary"/> 
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Наименование', 'Дата создания', 'Дата удаления', 'Действия']">
            @foreach ($trashedCategories as $item)
              <tr>
                <th>{{ $item->title }}</th>                         
                <td>{{ $item->created_at }}</td>               
                <td>{{ $item->deleted_at }}</td>    
                <td class="d-flex">             
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     
    </div> 
    
@endsection