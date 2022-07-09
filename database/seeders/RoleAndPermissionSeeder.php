<?php

namespace Database\Seeders;

use App\Types\PermissionType;
use App\Types\RoleType;
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
      Permission::create(['name' => PermissionType::CAN_CREATE_USER]);
      Permission::create(['name' => PermissionType::CAN_UPDATE_USER]);
      Permission::create(['name' => PermissionType::CAN_DELETE_USER]);

      Permission::create(['name' => PermissionType::CAN_CREATE_POST]);
      Permission::create(['name' => PermissionType::CAN_UPDATE_POST]);
      Permission::create(['name' => PermissionType::CAN_DELETE_POST]);

      $adminRole = Role::create(['name' => RoleType::ADMIN]);
      $writerRole = Role::create(['name' => RoleType::WRITER]);
      $editorRole = Role::create(['name' => RoleType::EDITOR]);

      $adminRole->givePermissionTo([
        PermissionType::CAN_CREATE_USER,
        PermissionType::CAN_UPDATE_USER,
        PermissionType::CAN_DELETE_USER,
        PermissionType::CAN_CREATE_POST,
        PermissionType::CAN_UPDATE_POST,
        PermissionType::CAN_DELETE_POST,
      ]);

      $writerRole->givePermissionTo([
        PermissionType::CAN_CREATE_POST,
      ]);

      $editorRole->givePermissionTo([
        PermissionType::CAN_UPDATE_POST,
      ]);
    }
}
