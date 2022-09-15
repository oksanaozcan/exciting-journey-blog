@extends('admin.layouts.app')
@section('content')

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Content Header (Page header) -->   
  {{-- <x-header-content title="Комментарии"/>  --}}
  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">          
      <div class="row">
        <div class="col-sm-12">        
          <x-table :headers="['Наименование', 'Автор', 'Likes', 'Visits', 'Comments', 'Дата создания', 'Действия']">
            @foreach ($articles as $item)
              <tr>
                <th>                 
                  <a href="{{ route('client.article.show', $item->id) }}">{{ $item->title }}</a>
                </th>                                      
                <th>{{ $item->user->name }}</th>                         
                <th>{{ $item->likes->count() }}</th>                                                          
                <th>{{ $item->visits->count() }}</th>                                                          
                <th>{{ $item->comments->count() }}</th>                                                          
                <td>{{ $item->created_at }}</td>                              
                <td class="d-flex">                            
                  <x-ui.delete-btn path='admin.article.delete' :id="$item->id" />                  
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>   
      {{-- <div> React component  </div> --}}
    </div> 
    
@endsection