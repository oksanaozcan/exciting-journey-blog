import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import Sidebar from '@/Layouts/Sidebar';
import PostTable from '@/Components/admin/PostTable';

export default function IndexPost(props) {
  const {posts, permissions, forTrashed} = props;  
  
  const isAllowedCreate = permissions.post_create.some(el => {
    if (el.id === props.auth.user.id) {
      return true;
    } 
    return false;
  }) 

    return (
      <Authenticated
        auth={props.auth}
        errors={props.errors}        
      >        
        <div className="grid grid-cols-10 gap-1">                    
          <Sidebar auth={props.auth} />          
          <div className="col-span-9">               
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">                  
              <div className="bg-white flex flex-col items-end overflow-hidden shadow-sm sm:rounded-lg">
                <Link 
                  href='/admin/posts/create'
                  className="w-1/4 my-4 mx-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={ isAllowedCreate ? { display:'block'} : {display : 'none'} }                 
                >
                  Add Post
                </Link>      
                <PostTable posts={posts} forTrashed={forTrashed}/>                     
              </div>
            </div>        
          </div>
        </div>                      
      </Authenticated>
    );
}
