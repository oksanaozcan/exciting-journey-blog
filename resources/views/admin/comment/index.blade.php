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
          <x-table :headers="['Пост', 'Автор Комментария', 'Сообщение', 'Тип', 'Дата создания', 'Действия']">
            @foreach ($comments as $item)
              <tr>
                <th>
                  @if ($item->commentable_type === "App\Models\Post")
                    <a href="{{ route('client.post.show', $item->commentable->id) }}">{{ $item->commentable->title }}</a>
                  @else
                    <a href="{{ route('client.article.show', $item->commentable->id) }}">{{ $item->commentable->title }}</a>
                  @endif
                </th>
                                      
                <th>{{ $item->user->name }}</th>                         
                <th>{{ $item->message }}</th>                         
                <th>{{ $item->commentable_type }}</th>                         
                <td>{{ $item->created_at }}</td>                              
                <td class="d-flex">
                  <x-ui.show-btn path='admin.comment.show' :id="$item->id" >Смотреть</x-ui.show-btn>               
                  <x-ui.edit-btn path='admin.comment.edit' :id="$item->id" >Изменить</x-ui.show-btn>                   
                  <x-ui.delete-btn path='admin.comment.delete' :id="$item->id" />                  
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>   
      {{-- <div> React component  </div> --}}
    </div> 
    
@endsection