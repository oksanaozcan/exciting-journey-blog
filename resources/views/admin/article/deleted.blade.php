@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  {{-- <x-header-content title="Удаленные Теги" path="admin.tag.index" routeTitle="Активные теги" btnClasses="btn btn-outline-secondary"/>  --}}
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Статья', 'Автор', 'Дата создания', 'Дата удаления', 'Действия']">
            @foreach ($trashedArticles as $item)
              <tr>
                <th>{{ $item->title }}</th>                                            
                <th>{{ $item->user ? $item->user->name : 'user was banned'}}</th>                                                      
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