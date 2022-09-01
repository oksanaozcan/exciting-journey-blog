import React, {useMemo} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import MyActivity from '@/Components/client/tabs/MyActivity';

const LikedPosts = ({permissions, auth, admin, errors, liked_posts}) => { 
  const likedPosts = useMemo(() => liked_posts, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Liked Posts</h2>}
    >
      <Head title="Liked Posts" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'liked-posts'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <MyActivity items={likedPosts}/>                              
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default LikedPosts;