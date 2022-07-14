import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) { 
  const {permissions} = props;  
  console.log(permissions);

  const isAllowed = permissions.post_create.some(el => {
    if (el.id === props.auth.user.id) {
      return true;
    } 
    return false;
  })

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">User</div>      
                        <Link 
                          href='/admin/posts/create'
                          style={ isAllowed ? { display:'block'} : {display : 'none'} }  
                        >
                          Add Post
                        </Link>                  
                    </div>
                </div>
            </div>            
        </Authenticated>
    );
}
