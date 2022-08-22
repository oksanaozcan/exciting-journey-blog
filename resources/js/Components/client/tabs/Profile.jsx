import React from "react";
import dateFormat from 'dateformat';

const Profile = ({user}) => {
  return (   
    <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{user.name}</h5>      
      </div>
      <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Email: </p>
                </div>
                <div className="flex-1 min-w-0">                       
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                </div>                   
              </div>
            </li>          
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <p className="text-base font-semibold text-gray-900 dark:text-white">Created At: </p>
                </div>
                <div className="flex-1 min-w-0">                       
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">{dateFormat(user.created_at, "mmmm dS, yyyy")}</p>
                </div>                   
              </div>
            </li>           
          </ul>
      </div>
    </div>
  )
}

export default Profile;