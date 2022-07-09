@props([
  'disabled' => false,
  'path' => $path,
  'id' => $id
  ])

<form action="{{ route($path, $id) }}" method="POST">
  @csrf
  @method('DELETE')
  <button type="submit" class="btn btn-danger"
  {{ $disabled ?? false ? ' disabled' :'' }}
  >Удалить</button>
</form>  