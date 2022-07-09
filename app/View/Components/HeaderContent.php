<?php

namespace App\View\Components;

use Illuminate\View\Component;

class HeaderContent extends Component
{
  public $title;
  public $path;
  public $btnClasses;
  public $routeTitle; 

  public function __construct($title, $path, $routeTitle = 'Добавить', $btnClasses = 'btn btn-primary')
  {
    $this->title = $title;    
    $this->path = $path;    
    $this->routeTitle = $routeTitle;    
    $this->btnClasses = $btnClasses;   
  }

  public function render()
  {
    return view('components.header-content');
  }
}
