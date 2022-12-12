import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, InertiaLink, Link } from '@inertiajs/inertia-react';
import Sidebar from '@/Layouts/Sidebar';
import PostTable from '@/Components/admin/PostTable';

export default function IndexChat(props) {   
  
    return (
      <Authenticated
        permissions={props.permissions}
        auth={props.auth}
        errors={props.errors}        
      >        
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <Sidebar auth={props.auth} />   
          </div>                 
          <div className="flex-initial">               
            <div>                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
               admin chat               
              </div>
            </div>        
          </div>
        </div>                      
      </Authenticated>
    );
}
