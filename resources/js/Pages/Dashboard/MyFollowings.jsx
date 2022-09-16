import { useMemo } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import ShortUserList from '@/Components/client/ShortUserList';
import Pagination from '@/Components/client/Pagination';

const MyFollowings = ({permissions, auth, errors, admin, followings}) => {
  const myFollowings = useMemo(() => followings, []); 
  return (
    <Authenticated
      permissions={permissions}
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
    >
      <Head title="Followings" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-followings'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <ShortUserList items={myFollowings}/>             
                <Pagination items={myFollowings}/>         
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default MyFollowings;