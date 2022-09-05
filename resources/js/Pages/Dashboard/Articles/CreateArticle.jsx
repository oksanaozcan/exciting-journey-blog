import React, {useMemo} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';

const CreateArticle = ({permissions, auth, admin, errors}) => { 
  // const myArticles = useMemo(() => articles, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Article</h2>}
    >
      <Head title="Create Article" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-articles'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                form create        
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default CreateArticle;