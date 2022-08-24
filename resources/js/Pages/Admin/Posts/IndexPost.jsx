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
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <Sidebar auth={props.auth} />   
          </div>                 
          <div className="flex-initial">               
            <div className="">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <Link 
                  href='/admin/posts/create'
                  className="w-1/4 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
