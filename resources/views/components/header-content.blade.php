<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="m-0">{{ $title }}</h1>
      </div>
      <div class="col-sm-6 d-flex flex-row-reverse">
        <a href={{ route($path) }} type="button" class="{{ $btnClasses }}">{{ $routeTitle }}</a>    
      </div>
    </div>
  </div>
</div>