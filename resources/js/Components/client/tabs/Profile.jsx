import React from "react";
import dateFormat from 'dateformat';
import PostIcon from "@/Components/icons/PostIcon";
import WebsiteIcon from "@/Components/icons/WebsiteIcon";
import BtnLink from "../BtnLink";


const Profile = ({user, publicInfo}) => {
  return (   
    <div className="p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">{user.name}</h5>    
        <div className="py-2 px-10 border-x-2 border-slate-600">
          <h6 className="text-xl font-semibold leading-none text-gray-900 dark:text-white">{publicInfo.headline}</h6>        
        </div>
        <div className="block p-4 my-4 bg-indigo-50 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="font-normal text-gray-700 dark:text-gray-400">{publicInfo.description}</p>
        </div>           
      </div>
      <div className="flow-root">
        <h3>Links: </h3>
        <div className="flex flex-row justify-around">
          {
            publicInfo.website === null ? null : <BtnLink path={publicInfo.website} title={'Website'} icon={<WebsiteIcon/>}/>
          }
          {
            publicInfo.twitter === null ? null : <BtnLink path={publicInfo.twitter} title={'Twitter'} icon={<WebsiteIcon/>}/>
          }
          {
            publicInfo.facebook === null ? null : <BtnLink path={publicInfo.facebook} title={'Facebook'} icon={<WebsiteIcon/>}/>
          }
          {
            publicInfo.instagram === null ? null : <BtnLink path={publicInfo.instagram} title={'Instagram'} icon={<WebsiteIcon/>}/>
          }
           {
            publicInfo.youtube === null ? null : <BtnLink path={publicInfo.youtube} title={'Youtube'} icon={<WebsiteIcon/>}/>
          }
        </div>          
      </div>
    </div>
  )
}

export default Profile;