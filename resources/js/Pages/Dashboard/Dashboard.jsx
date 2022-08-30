import React, {useEffect, useState, useMemo} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link } from '@inertiajs/inertia-react';
import Profile from '@/Components/client/tabs/Profile';
import tabsData from '@/data/tabsData';
import MyActivity from '@/Components/client/tabs/MyActivity';
import Writer from '@/Components/client/tabs/Writer';
import Moderator from '@/Components/client/tabs/Moderator';
import EditorTabContent from '@/Components/client/tabs/EditorTabContent';
import SidebarDashboard from '@/Components/client/SidebarDashboard';

export default function Dashboard({permissions, auth, errors, comments, admin, public_info}) {
  const publicInfo = useMemo(() => public_info, []);

  return (
    <Authenticated
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


// export default function Dashboard({permissions, auth, errors, comments, admin}) {
//   const myComments = useMemo(() => comments, []); 
//   const isAllowedCreate = permissions.post_create.some(el => {
//     if (el.id === auth.user.id) {
//       return true;
//     } 
//     return false;
//   })
//   const isAllowedUpdate = permissions.post_update.some(el => {
//     if (el.id === auth.user.id) {
//       return true;
//     } 
//     return false;
//   })
//   const isAllowedUpdateComment = permissions.comment_update.some(el => {
//     if (el.id === auth.user.id) {
//       return true;
//     } 
//     return false;
//   })

//   const [tabs, setTabs] = useState([]); 

//   useEffect(() => {
//     let checkPermission = tabsData.map(item => {
//       if (item.title === 'Profile') {
//         return {...item, content: <Profile user={auth.user}/>}
//       } else if (item.title === 'My Activity') {
//         return {...item, content: <MyActivity myComments={myComments}/>}
//       } else if (item.title === 'Writer' && isAllowedCreate) {
//         return {...item, opened: true, content: <Writer />}
//       } else if (item.title === 'Moderator' && isAllowedUpdateComment) {
//         return {...item, opened: true, content: <Moderator/>}
//       } else if(item.title === 'Editor' && isAllowedUpdate) {
//         return {...item, opened: true, content: <EditorTabContent />}
//       } else {
//         return item
//       }
//     });    
//     const newData = checkPermission.filter(item => item.opened)
//     setTabs(newData);
//   },[])

//   const toggleActiveTab = (id) => {
//     let newTabs = tabs.map(tab => {
//       if (tab.id === id) {
//         return {...tab, active: true}
//       } else {
//         return {...tab, active: false}
//       }
//     });
//     setTabs(newTabs);
//     
//     return ()
//   }  


// return (
//   <Authenticated
//     auth={auth}
//     errors={errors}
//     admin={admin}
//     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
//   >
//     <Head title="Dashboard" />
//       <div className="py-12">
//         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> 
//           <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">                                       
//             <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
//               <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
//                 {
//                   tabs.map(tab => (
//                     <li key={tab.id} className="mr-2" role="presentation">
//                       <button 
//                         className={tab.active ? 'tab-btn dashboard-tab__active' : 'tab-btn dashboard-tab'}   
//                         onClick={() => toggleActiveTab(tab.id)}                   
//                       >
//                         {tab.title}
//                       </button>
//                     </li>
//                   ))
//                 }                   
//               </ul>
//             </div>

//             <div id="myTabContent">
//               {
//                 tabs.map(tab => (
//                   <div 
//                     key={tab.id}
//                     className={tab.active ? 'tab-content p-4 bg-gray-50 rounded-lg dark:bg-gray-800' : 'tab-content hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800'}>
//                     {tab.content}
//                   </div>
//                 ))
//               }                
//             </div>
//           </div>
//         </div>
//       </div>            
//   </Authenticated>
// );