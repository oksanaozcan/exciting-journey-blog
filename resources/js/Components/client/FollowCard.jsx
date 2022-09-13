import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BtnLink from "./BtnLink";
import WebsiteIcon from "../icons/WebsiteIcon";

const FollowCard = ({authorArticles, isFollowings, isPublicProfilePage=false}) => {
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(isFollowings);
  }, [])

  return (    
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">    
      <div className="flex flex-col items-center pb-10">       
        <h5 className="mb-1 mt-2 text-xl font-medium text-gray-900 dark:text-white">{authorArticles.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{authorArticles.headline}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          {
            isFollow ? 
            <Link 
              href={route('user.unfollow', authorArticles.id)} 
              method='POST'
              as="button"
              preserveState={false}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
              >
                Unfollow
            </Link>            
            :
            <Link 
              href={route('user.follow', authorArticles.id)}  
              method='POST'
              as="button"
              preserveState={false}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Follow
            </Link>           
          }         
          {
            isPublicProfilePage ?
            null :
            <Link 
            href={route('user.public.profile.show', authorArticles.id)}  
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              More info: {authorArticles.name}
            </Link>
          }          
        </div>
        
        {
          isPublicProfilePage ?
          <div className="flex flex-row justify-around mt-4">
          {
            authorArticles.website === null ? null : <BtnLink path={authorArticles.website} title={'Website'} icon={<WebsiteIcon/>}/>
          }
          {
            authorArticles.twitter === null ? null : <BtnLink path={authorArticles.twitter} title={'Twitter'} icon={<WebsiteIcon/>}/>
          }
          {
            authorArticles.facebook === null ? null : <BtnLink path={authorArticles.facebook} title={'Facebook'} icon={<WebsiteIcon/>}/>
          }
          {
            authorArticles.instagram === null ? null : <BtnLink path={authorArticles.instagram} title={'Instagram'} icon={<WebsiteIcon/>}/>
          }
           {
            authorArticles.youtube === null ? null : <BtnLink path={authorArticles.youtube} title={'Youtube'} icon={<WebsiteIcon/>}/>
          }
        </div>          
          :
          null
        }
        {
          isPublicProfilePage ?         
            <div 
              className={`${authorArticles.description === null ? 'hidden' : 'block'} p-4 mx-4 my-4 bg-indigo-50 rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            >
              <p className="font-normal text-gray-700 dark:text-gray-400">{authorArticles.description}</p>
            </div>          
          :
          null
        }
      </div>
    </div>
  )
}

export default FollowCard;