import React, {useMemo} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import MyActivity from '@/Components/client/tabs/MyActivity';

const LikedArticles = ({permissions, auth, admin, errors, liked_articles}) => { 
  const likedArticles = useMemo(() => liked_articles, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Liked Articles</h2>}
    >
      <Head title="Liked Articles" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'liked-articles'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <MyActivity items={likedArticles}/>                              
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default LikedArticles;