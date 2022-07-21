<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      $this->call([
        RoleAndPermissionSeeder::class,
        AdminSeeder::class
      ]);

      Category::factory(8)->create();       

      for ($i=0; $i < 10; $i++) { 
        Post::factory()->hasTags(3)->create();
      }
    }
}
