import React from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Link } from '@inertiajs/inertia-react';
import Sidebar from '@/Layouts/Sidebar';
import PostCard from "@/Components/admin/PostCard";
import { Inertia } from "@inertiajs/inertia";

export default function ShowPost (props) {
  const {post, permissions} = props;  
  
  const isAllowedCreate = permissions.post_create.some(el => {
    if (el.id === props.auth.user.id) {
      return true;
    } 
    return false;
  }) 

  const isAllowedDelete = permissions.post_delete.some(el => {
    if (el.id === props.auth.user.id) {
      return true;
    } 
    return false;
  }) 

  const onDeletePost = (id) => {
    Inertia.delete(`/admin/posts/${id}`);
  }

  return (
    <Authenticated
      permissions={permissions}
        auth={props.auth}
        errors={props.errors}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
      >        
        <div className="grid grid-cols-5 gap-1">          
          <div className="..."> 
            <Sidebar auth={props.auth} />
          </div>
          <div className="col-span-4 ...">
          <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Link 
              href='/admin/posts/create'
              style={ isAllowedCreate ? { display:'block'} : {display : 'none'} }                 
            >
              Add Post
            </Link>       
            <a style={props.auth.user.roles[0].name === 'admin' ? { display:'block'} : {display : 'none'} } href="/admin">Admin</a>                
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <PostCard post={post} onDeletePost={onDeletePost} isAllowedDelete={isAllowedDelete}/>              
            </div>
          </div>
        </div>         
          </div>
        </div>                      
      </Authenticated>  
  )
}