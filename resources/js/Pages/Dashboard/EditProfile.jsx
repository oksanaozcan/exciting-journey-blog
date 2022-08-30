import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';

const EditProfile = ({permissions, auth, errors, admin}) => {
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
            <SidebarDashboard activeLink={'profile'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                Edit
                Content
                                 
              </div>
            </div>        
          </div>
        </div>         
    </Authenticated>
  )
}

export default EditProfile;