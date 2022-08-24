import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import UsersIcon from '@/Components/icons/UsersIcon';
import CategoryIcon from '@/Components/icons/CategoryIcon';
import TagIcon from '@/Components/icons/TagIcon';
import PostIcon from '@/Components/icons/PostIcon';
import CommentIcon from '@/Components/icons/CommentIcon';
import ShieldCheckIcon from '@/Components/icons/ShieldCheckIcon';

const dropdownData = [
  {
    id: uuidv4(),
    title: 'Users',
    icon: <UsersIcon/>,
    dropdown: false,
    permissionFor: ['admin'],
    inertiaLink: false,
    links: [
      {
        id: uuidv4(),
        route: 'admin.user.index',
        title: 'List',
        permissionFor: ['admin'],
      },
      {
        id: uuidv4(),
        route: 'admin.user.deleted',
        title: 'Deleted',
        permissionFor: ['admin'],
      },
    ],
  },
  {
    id: uuidv4(),
    title: 'Categories',
    icon: <CategoryIcon/>,
    dropdown: false,
    permissionFor: ['admin'],
    inertiaLink: false,
    links: [
      {
        id: uuidv4(),
        route: 'admin.category.index',
        title: 'List',
        permissionFor: ['admin'],
      },
      {
        id: uuidv4(),
        route: 'admin.category.create',
        title: 'Create',
        permissionFor: ['admin'],
      },
      {
        id: uuidv4(),
        route: 'admin.category.deleted',
        title: 'Deleted',
        permissionFor: ['admin'],
      },      
    ]
  },
  {
    id: uuidv4(),
    title: 'Tags',
    icon: <TagIcon/>,
    dropdown: false,
    permissionFor: ['admin'],
    inertiaLink: false,
    links: [
      {
        id: uuidv4(),
        route: 'admin.tag.index',
        title: 'List',
        permissionFor: ['admin'],
      },
      {
        id: uuidv4(),
        route: 'admin.tag.create',
        title: 'Create',
        permissionFor: ['admin'],
      },
      {
        id: uuidv4(),
        route: 'admin.tag.deleted',
        title: 'Deleted',
        permissionFor: ['admin'],
      },      
    ]
  },
  {
    id: uuidv4(),
    title: 'Posts',
    icon: <PostIcon/>,
    dropdown: false,
    permissionFor: ['admin', 'writer', 'editor'],
    inertiaLink: true,
    links: [
      {
        id: uuidv4(),
        route: 'admin.post.index',
        title: 'List',
        permissionFor: ['admin', 'editor'],
      },
      {
        id: uuidv4(),
        route: 'admin.post.create',
        title: 'Create',
        permissionFor: ['admin', 'writer'],
      },
      {
        id: uuidv4(),
        route: 'admin.post.deleted',
        title: 'Deleted',
        permissionFor: ['admin'],
      },      
    ]
  },
  {
    id: uuidv4(),
    title: 'Comments',
    icon: <CommentIcon/>,
    dropdown: false,
    permissionFor: ['admin', 'moderator'],
    inertiaLink: false,
    links: [
      {
        id: uuidv4(),
        route: 'admin.comment.index',
        title: 'List',
        permissionFor: ['admin', 'moderator'],
      },     
      {
        id: uuidv4(),
        route: 'admin.comment.deleted',
        title: 'Deleted',
        permissionFor: ['admin', 'moderator'],
      },      
    ]
  },
  {
    id: uuidv4(),
    title: 'Moderation',
    icon: <ShieldCheckIcon/>,
    dropdown: false,
    permissionFor: ['admin', 'moderator'],
    inertiaLink: false,
    links: [
      {
        id: uuidv4(),
        route: 'admin.user.reader',
        title: "Reader's List",
        permissionFor: ['admin', 'moderator'],
      },     
      {
        id: uuidv4(),
        route: 'admin.user.banned',
        title: 'Banned Readers',
        permissionFor: ['admin', 'moderator'],
      },      
    ]
  },

]

export default dropdownData;