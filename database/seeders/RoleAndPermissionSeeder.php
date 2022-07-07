<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      Permission::create(['name' => 'create-user']);
      Permission::create(['name' => 'edit-user']);
      Permission::create(['name' => 'delete-user']);

      Permission::create(['name' => 'create-post']);
      Permission::create(['name' => 'edit-post']);
      Permission::create(['name' => 'delete-post']);

      $adminRole = Role::create(['name' => 'admin']);
      $writerRole = Role::create(['name' => 'writer']);
      $editorRole = Role::create(['name' => 'editor']);

      $adminRole->givePermissionTo([
        'create-user',
        'edit-user',
        'delete-user',
        'create-post',
        'edit-post',
        'delete-post',
      ]);

      $writerRole->givePermissionTo([
        'create-post',
      ]);

      $editorRole->givePermissionTo([
        'edit-post',
      ]);
    }
}
