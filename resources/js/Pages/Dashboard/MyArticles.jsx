import React, {useMemo} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import PostTable from "@/Components/admin/PostTable";

const MyArticles = ({permissions, auth, admin, errors, articles, current_columns}) => { 
  const myArticles = useMemo(() => articles, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Article's List</h2>}
    >
      <Head title="Liked Posts" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-articles'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <PostTable posts={myArticles} current_columns={current_columns}/>            
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default MyArticles;