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
       
        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-list"></i>
            <p>
              Темы
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>

        {{-- <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon far fa-bell"></i>
            <p>
              Заявки
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.order.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.order.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить с клиентом</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.order.create-single-order') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.order.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-address-card"></i>
            <p>
              Клиенты
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.customer.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.customer.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.customer.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon far fa-image"></i>
            <p>
              Фотографии
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="{{ route('admin.picture.index') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.picture.create') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="{{ route('admin.picture.deleted') }}" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li> --}}

        {{-- <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-tag"></i>
            <p>
              Тэги
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-leaf"></i>
            <p>
              Культуры
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Статистика импортов</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-address-card"></i>
            <p>
              Клиенты
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Статистика импортов</p>
              </a>
            </li>
          </ul>
        </li>

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
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Список</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Добавить</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Удаленные</p>
              </a>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-eraser"></i>   
            <p>
              Удаленные объекты
              <i class="fas fa-angle-left right"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-circle nav-icon"></i>
                <p>Общая статистика</p>
              </a>
            </li>            
          </ul>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="far fa-envelope nav-icon"></i>
            <p>Заявки</p>
          </a>
        </li> --}}

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

