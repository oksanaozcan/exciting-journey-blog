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

      Permission::create(['name' => PermissionType::CAN_COMMENT_POST]);

      Permission::create(['name' => PermissionType::CAN_UPDATE_COMMENT]);
      Permission::create(['name' => PermissionType::CAN_DELETE_COMMENT]);



      $adminRole = Role::create(['name' => RoleType::ADMIN]);
      $writerRole = Role::create(['name' => RoleType::WRITER]);
      $editorRole = Role::create(['name' => RoleType::EDITOR]);
      
      $readerRole = Role::create(['name' => RoleType::READER]);

      $moderatorRole = Role::create(['name' => RoleType::MODERATOR]);

      $adminRole->givePermissionTo([
        PermissionType::CAN_CREATE_USER,
        PermissionType::CAN_UPDATE_USER,
        PermissionType::CAN_DELETE_USER,
        PermissionType::CAN_CREATE_POST,
        PermissionType::CAN_UPDATE_POST,
        PermissionType::CAN_DELETE_POST,
        PermissionType::CAN_COMMENT_POST,
        PermissionType::CAN_UPDATE_COMMENT,
        PermissionType::CAN_DELETE_COMMENT
      ]);

      $writerRole->givePermissionTo([
        PermissionType::CAN_CREATE_POST,
        PermissionType::CAN_COMMENT_POST
      ]);

      $editorRole->givePermissionTo([
        PermissionType::CAN_UPDATE_POST,
        PermissionType::CAN_COMMENT_POST
      ]);

      $readerRole->givePermissionTo([
        PermissionType::CAN_COMMENT_POST
      ]);

      $moderatorRole->givePermissionTo([
        PermissionType::CAN_COMMENT_POST,
        PermissionType::CAN_UPDATE_USER,
        PermissionType::CAN_UPDATE_COMMENT,
        PermissionType::CAN_DELETE_COMMENT,
      ]);
    }
}
