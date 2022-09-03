@extends('admin.layouts.app')
@section('content')

<div class="content-wrapper">  
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Статистика</h1>
        </div>
      </div>
    </div>
  </div> 

  <!-- Main content -->
  <section class="content">
    <div class="container-fluid">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <h3>Пользователи</h3>
              <p>Всего: {{ $usersCount }} </p>             
            </div>
            <div class="icon">
              <i class="ion ion-person"></i>
            </div>
            <a href={{ route('admin.user.index') }} class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-warning">
            <div class="inner">
              <h3>Посты</h3>
              <p>Всего: {{ $postsCount }}</p>
            </div>
            <div class="icon">
              <i class="ion ion-image"></i>
            </div>
            <a href="{{ route('admin.post.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-danger">
            <div class="inner">
              <h3>Категории</h3>
              <p>Всего: {{ $categoriesCount }} </p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="{{ route('admin.category.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-primary">
            <div class="inner">
              <h3>Тэги</h3>
              <p>Всего: {{ $tagsCount }}</p>
            </div>
            <div class="icon">
              <i class="fas fa-tag"></i>
            </div>
            <a href="{{ route('admin.tag.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>

        <div class="col-lg-3 col-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>Комментарии</h3>
              <p>Всего: {{ $commentsCount }} </p>
            </div>
            <div class="icon">
              <i class="far fa-envelope"></i>
            </div>
            <a href="{{ route('admin.comment.index') }}" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->

      <div class="row">
        <h2 class="mt-2">3 Most Popular Posts For All Time: </h2>
        <div class="col-sm-12">        
          <x-table :headers="['Title', 'Visits', 'Likes', 'Comments', 'Created At', 'Author', 'Show']">
            @foreach ($mostPopularPostsAllTime as $mostPopPostAll)
              <tr>                                     
                <th>{{ $mostPopPostAll->title }}</th>                                                 
                <th>{{ $mostPopPostAll->visit_count_total }}</th>                                                 
                <th>{{ $mostPopPostAll->likes_count}}</th>                                                 
                <th>{{ $mostPopPostAll->comments_count}}</th>                                                 
                <th>{{ $mostPopPostAll->created_at}}</th>                                                 
                <th>{{ $mostPopPostAll->user->name}}</th>                                                                                                                
                <td class="d-flex">
                  <x-ui.show-btn path='client.post.show' :id="$mostPopPostAll->id" >Show</x-ui.show-btn>                                      
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     

      <div class="row">
        <h2 class="mt-2">3 Most Popular Posts Last Week: </h2>
        <div class="col-sm-12">        
          <x-table :headers="['Title', 'Visits', 'Likes', 'Comments', 'Created At', 'Author', 'Show']">
            @foreach ($mostPopularPostsLastWeek as $mostPopPostWeek)
              <tr>                                     
                <th>{{ $mostPopPostWeek->title }}</th>                                                 
                <th>{{ $mostPopPostWeek->visit_count_total }}</th>                                                 
                <th>{{ $mostPopPostWeek->likes_count}}</th>                                                 
                <th>{{ $mostPopPostWeek->comments_count}}</th>                                                 
                <th>{{ $mostPopPostWeek->created_at}}</th>                                                 
                <th>{{ $mostPopPostWeek->user->name}}</th>                                                                                                                
                <td class="d-flex">
                  <x-ui.show-btn path='client.post.show' :id="$mostPopPostWeek->id" >Show</x-ui.show-btn>                                      
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     

      <div class="row">
        <h2 class="mt-2">3 Most Popular Posts Today: </h2>
        <div class="col-sm-12">        
          <x-table :headers="['Title', 'Visits', 'Likes', 'Comments', 'Created At', 'Author', 'Show']">
            @foreach ($mostPopularPostsToday as $mostPopPostToday)
              <tr>                                     
                <th>{{ $mostPopPostToday->title }}</th>                                                 
                <th>{{ $mostPopPostToday->visit_count_total }}</th>                                                 
                <th>{{ $mostPopPostToday->likes_count}}</th>                                                 
                <th>{{ $mostPopPostToday->comments_count}}</th>                                                 
                <th>{{ $mostPopPostToday->created_at}}</th>                                                 
                <th>{{ $mostPopPostToday->user->name}}</th>                                                                                                                
                <td class="d-flex">
                  <x-ui.show-btn path='client.post.show' :id="$mostPopPostToday->id" >Show</x-ui.show-btn>                                      
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     
     
      <div class="row">
        <h2 class="mt-2">KPI Писателей:</h2>
        <div class="col-sm-12">        
          <x-table :headers="['Имя', 'Кол-во постов', 'Кол-во комментариев', 'Дата последней публикации', 'Кол-во ком-в посл пуб-ции', 'Действия']">
            @foreach ($writers as $writer)
              <tr>                                     
                <th>{{ $writer->name }}</th>                                                 
                <th>{{ $writer->posts ? $writer->posts->count() : '0' }}</th>                                                 
                <th>{{ $writer->commentsWriter ? $writer->commentsWriter->count() : '0' }}</th>                                                 
                <th>{{ $writer->latestPublishedPost->isNotEmpty() ? $writer->latestPublishedPost[0]->created_at : 'no post'}}</th>                                                 
                <th>{{ $writer->latestPublishedPost->isNotEmpty() ? $writer->latestPublishedPost[0]->comments->count() : 'no post'}}</th>                                                  
                <td class="d-flex">
                  <x-ui.show-btn path='admin.user.show' :id="$writer->id" >Общие сведения</x-ui.show-btn>               
                  <x-ui.show-btn path='admin.user.showAsWriter' :id="$writer->id" >Сведения как писателя</x-ui.show-btn>                
                </td>
              </tr>                         
            @endforeach               
          </x-table>          
        </div>
      </div>     


    </div>
  </section> 

@endsection