import { useMemo } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import MyActivity from '@/Components/client/tabs/MyActivity';

const Communication = ({permissions, auth, errors, admin, comments}) => {
  const myComments = useMemo(() => comments, []); 
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
    >
      <Head title="Edit Profile" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'communication'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <MyActivity myComments={myComments}/>                              
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default Communication;