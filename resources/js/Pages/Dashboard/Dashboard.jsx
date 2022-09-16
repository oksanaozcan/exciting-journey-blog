import React, {useMemo} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head} from '@inertiajs/inertia-react';
import Profile from '@/Components/client/tabs/Profile';
import SidebarDashboard from '@/Components/client/SidebarDashboard';

export default function Dashboard({permissions, auth, errors, comments, admin, public_info}) {
  const publicInfo = useMemo(() => public_info, []);

  return (
    <Authenticated
      permissions={permissions}
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
    >
      <Head title="Dashboard" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'public-profile'}/>
          </div>                 
          <div className="flex-initial w-full">               
            <div className="my-2 ml-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <Profile user={auth.user} publicInfo={publicInfo}/>                                                
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  );
}