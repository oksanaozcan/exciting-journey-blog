import React, {useMemo} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import PostTable from "@/Components/admin/PostTable";
import { Link } from "@inertiajs/inertia-react";

const IndexArticle = ({permissions, auth, admin, errors, articles, current_columns, articles_count}) => { 
  const myArticles = useMemo(() => articles, []); 
  return (
    <Authenticated
      permissions={permissions}
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Article's List</h2>}
    >
      <Head title="My Articles" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-articles'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">                
                <div>Total articles: {articles_count}</div>
                <Link 
                  href={route('dashboard.articles.create')}
                  className="w-1/4 mt-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"        
                >
                  Add Article
                </Link>                                 
                <PostTable posts={myArticles} current_columns={current_columns}/>            
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default IndexArticle;