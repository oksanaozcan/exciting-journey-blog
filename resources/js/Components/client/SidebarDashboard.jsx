import { Link } from "@inertiajs/inertia-react";
import React from "react";
import CommentIcon from "../icons/CommentIcon";
import EyeIcon from "../icons/EyeIcon";
import LikeIcon from "../icons/LikeIcon";
import PostIcon from "../icons/PostIcon";
import ShieldCheckIcon from "../icons/ShieldCheckIcon";
import StarIcon from "../icons/StarIcon";
import UserIcon from "../icons/UserIcon";
import UsersIcon from "../icons/UsersIcon";

const SidebarDashboard = ({activeLink = 'public-profile'}) => {
  
  return (
    <aside className="w-64" aria-label="Sidebar" style={{ height: '100vh' }}>
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800" style={{ height: 'inherit' }}>
          <ul className="space-y-2 mt-4">
            
            <li>              
              <Link 
                className={activeLink === 'public-profile' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}                          
                href={route('dashboard')}                
              >
                <UsersIcon/>                
                <span className="ml-3">Public Profile</span>
              </Link>              
            </li>

            <li>              
              <Link
                className={activeLink === 'profile' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}         
                href={route('edit.profile')}                
              >
                <UserIcon/>            
                <span className="ml-3">Profile</span>
              </Link>               
            </li>

            <li>              
              <Link 
                className={activeLink === 'communication' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'} 
                href={route('communication')}               
              >
                <CommentIcon/>                
                <span className="ml-3">Communication</span>
              </Link>               
            </li>           

            <li>              
              <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" 
                href="#"                
              >
                <StarIcon/>             
                <span className="ml-3">Followers</span>
              </a>               
            </li>

            <li>              
              <Link 
                className={activeLink === 'liked-posts' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}  
                href={route('dashboard.liked.posts')}           
              >
                <LikeIcon/>      
                <span className="ml-3">Liked Posts</span>
              </Link>               
            </li>

            <li>              
              <Link 
                className={activeLink === 'liked-articles' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}  
                href={route('dashboard.liked.articles')}           
              >
                <LikeIcon/>      
                <span className="ml-3">Liked Articles</span>
              </Link>               
            </li>

            <li>              
              <Link 
                className={activeLink === 'my-articles' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}   
                href={route('dashboard.articles.index')}                
              >
                <PostIcon/>                
                <span className="ml-3">My Articles</span>
              </Link>               
            </li>

            <li>              
              <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" 
                href="#"                
              >
                <EyeIcon/>             
                <span className="ml-3">Privacy</span>
              </a>               
            </li>

            <li>  
            <Link
                className={activeLink === 'account-security' ? 'dashboard-sidebar-link_active' : 'dashboard-sidebar-link'}         
                href={route('dashboard.edit.password')}                
              >
                <ShieldCheckIcon/>            
                <span className="ml-3">Account Security</span>
              </Link>                            
            </li>           
                       
          </ul>
      </div>
    </aside>
  )
}

export default SidebarDashboard;