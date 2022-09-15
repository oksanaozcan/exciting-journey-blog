<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <!-- Brand Logo -->
  <a href={{ route('admin.index') }} class="brand-link">
    <img src="{{ asset('dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
    <span class="brand-text font-weight-light">{{ config('app.name', '####') }}</span>
  </a>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library -->

        @can('admin')             
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-users"></i>
            <p>
              Пользователи
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.user.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>          
            <li class="nav-item">
              <a href="{{ route('admin.user.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>  
        @endcan      

        @can('admin')  
        <li class="nav-item">
          <a href={{ route('admin.category.index') }} class="nav-link">
            <i class="nav-icon fas fa-list"></i>
            <p>
              Категории
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href={{ route('admin.category.index') }} class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.category.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.category.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>
        @endcan 
        
        @can('admin') 
        <li class="nav-item">
          <a href={{ route('admin.tag.index') }} class="nav-link">
            <i class="nav-icon fas fa-tag"></i>
            <p>
              Теги
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href={{ route('admin.tag.index') }} class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.tag.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.tag.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>
        @endcan
        
        @can(['admin', 'editor', 'writer']) 
        <li class="nav-item">
          <a href={{ route('admin.post.index') }} class="nav-link"> 
            <i class="nav-icon fas fa-sticky-note"></i>
            <p>
              Cтатьи
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href={{ route('admin.post.index') }} class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.post.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>          
          </ul>
        </li>
        @endcan
        
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="far fa-envelope nav-icon"></i>
            <p>
              Комментарии
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.comment.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>          
            <li class="nav-item">
              <a href="{{ route('admin.comment.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>            

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-sticky-note"></i>
            <p>
              Статьи читателей
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.article.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>          
            <li class="nav-item">
              <a href="{{ route('admin.article.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>            
        
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-users"></i>
            <p>
              Модерирование
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.user.reader') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Читатели</p>
              </a>
            </li>          
            <li class="nav-item">
              <a href="{{ route('admin.user.banned') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Забаненные</p>
              </a>
            </li>                    
          </ul>
        </li>               

        <li class="nav-item">          
          <a class="nav-link" href="{{ route('logout') }}"
              onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
            {{-- <i class="far fa-envelope nav-icon"></i> --}}
            <i class="fas fa-door-open nav-icon"></i>
              {{ __('Logout') }}
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
              @csrf
          </form>        
        </li>
       
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>

