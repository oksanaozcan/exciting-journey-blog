import React from "react";
import { useMemo } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import ShortUserList from '@/Components/client/ShortUserList';
import Pagination from '@/Components/client/Pagination';

export default function MyFollowers ({permissions, auth, errors, admin, followers}) {
  const myFollowers = useMemo(() => followers, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
    >
      <Head title="Followers" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-followers'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <ShortUserList items={myFollowers}/>             
                <Pagination items={myFollowers}/>         
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}