<div class="card" style="width: 36rem;">
  <div class="card-body">
    <h5 class="card-title">{{ $title }}</h5>
    @foreach ($text as $p)
      <p class="card-text">{{ $p }}</p>        
    @endforeach
    
  </div>
  <ul class="list-group list-group-flush">
    @foreach ($list as $item)
      <li class="list-group-item">{{ $item }}</li>
    @endforeach    
       
  </ul>
  <div class="card-body d-flex">
    <x-ui.edit-btn path='{{ $pathEdit }}' :id="$id" >Изменить</x-ui.show-btn>           
    <x-ui.delete-btn path='{{ $pathDelete }}' :id="$id" />     
  </div>
</div>        