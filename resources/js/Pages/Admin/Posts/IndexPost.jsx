import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import Sidebar from '@/Layouts/Sidebar';

export default function IndexPost(props) {
  const {posts, permissions} = props;
  console.log(props.auth);
  
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
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
      >        
        <div className="grid grid-cols-5 gap-1">          
          <div className="..."> 
            <Sidebar auth={props.auth} />
          </div>
          <div className="col-span-4 ...">
          <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <Link 
                href='/admin/posts/create'
                style={ isAllowedCreate ? { display:'block'} : {display : 'none'} }                 
              >
                Add Post
              </Link>       
              <a style={props.auth.user.roles[0].name === 'admin' ? { display:'block'} : {display : 'none'} } href="/admin">Admin</a>    

              <ul>
                {
                  posts.map(p => (
                    <li key={p.id}>{p.title} created at {p.created_at}</li>
                  ))
                }
              </ul>                    
            </div>
          </div>
        </div>         
          </div>
        </div>   
                   
      </Authenticated>
    );
}
