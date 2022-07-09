<table class="table sortable">
  <thead>
    <tr>
      @foreach ($headers as $header)
        <th scope="col">{{ $header }}</th>
      @endforeach      
    </tr>
  </thead>
  <tbody>
    {{ $slot }}       
  </tbody>
</table>