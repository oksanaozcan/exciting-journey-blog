<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Types\PermissionType;
use App\Types\RoleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {      
      $permissions = Cache::rememberForever('permissions', function () {
        return [
          'post_update' => User::permission(PermissionType::CAN_UPDATE_POST)->get(['id']),
          'post_create' => User::permission(PermissionType::CAN_CREATE_POST)->get(['id']),
          'post_delete' => User::permission(PermissionType::CAN_DELETE_POST)->get(['id']),
          'comment_update' => User::permission(PermissionType::CAN_UPDATE_COMMENT)->get(['id']),
        ];
      });

      return array_merge(parent::share($request), [
          'auth' => [
              'user' => $request->user(),
          ],
          'ziggy' => function () use ($request) {
              return array_merge((new Ziggy)->toArray(), [
                  'location' => $request->url(),
              ]);
          },
          'permissions' => $permissions,
          'flash' => [
            'message' => session('message')
          ],
      ]);
    }
}
