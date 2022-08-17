<?php

namespace App\Types;

class PermissionType
{
  public const CAN_CREATE_USER = 'create-user';
  public const CAN_UPDATE_USER = 'update-user';
  public const CAN_DELETE_USER = 'delete-user';

  public const CAN_CREATE_POST = 'create-post';
  public const CAN_UPDATE_POST = 'update-post';
  public const CAN_DELETE_POST = 'delete-post';

  public const CAN_COMMENT_POST = 'comment-post';

  public const CAN_UPDATE_COMMENT = 'update-comment';
  public const CAN_DELETE_COMMENT = 'delete-comment';

}