<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ShowCard extends Component
{
  public string $title;
  public $id;
  public array $text;
  public array $list;

  public function __construct(string $title, array $text, array $list, $id)
  {
    $this->title = $title;    
    $this->text = $text;    
    $this->list = $list;    
    $this->id = $id;
  }

  public function render()
  {
    return view('components.show-card');
  }
}
