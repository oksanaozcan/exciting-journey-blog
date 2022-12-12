import Pusher from 'pusher-js';
import React, {useMemo} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head} from '@inertiajs/inertia-react';
import Profile from '@/Components/client/tabs/Profile';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import { useEffect } from 'react';

export default function Dashboard({permissions, auth, errors, comments, admin, public_info}) {
  const publicInfo = useMemo(() => public_info, []);

  useEffect(() => {  

    // Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('session-changed');
    channel.bind("session-changed-event", function(data) {
      alert(JSON.stringify(data));
    });
    
    return (() => {
      pusher.unsubscribe('session-changed');
    });    
    

  }, []);

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