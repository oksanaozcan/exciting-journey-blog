import React from "react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import MyNavlink from '@/Components/client/MyNavlink';
import SmmIcon from '@/Components/client/SmmIcon';

export default function Footer () {
  return (
    <footer className='bg-black'>
      <div className='container max-w-6xl py-10 mx-auto'>
        <div className='flex flex-col items-center mb-8 space-y-6 md:flex-row md:space-y-0 md:justify-between md:items-start'>
          <div className="flex flex-col items-center space-y-8 md:items-start md:space-y-4">
            <ApplicationLogo className="rounded-full"/>
            <div className='flex flex-col items-center space-y-4 font-bold text-white md:flex-row md:space-y-0 md:space-x-6 md:ml-3'>
            <MyNavlink path={route('main')} title={"Home"}/>
            <MyNavlink path={route('client.post.index')} title={"All Posts"}/>
            <MyNavlink path={route('client.category.index')} title={"Categories"}/>
            <MyNavlink path={route('client.tag.index')} title={"Tags"}/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between space-y-4 text-gray-500">
          <div className="flex items-center justify-center mx-auto space-x-4 md:justify-end md:mx-0">
            <SmmIcon path={'#'} img={'../images/icon-facebook.svg'}/>
            <SmmIcon path={'#'} img={'../images/icon-twitter.svg'}/>
            <SmmIcon path={'#'} img={'../images/icon-instagram.svg'}/>                                    
            <SmmIcon path={'#'} img={'../images/icon-pinterest.svg'}/>                                    
          </div>
          <div className='font-bold'>
            &copy; 2022 Exciting Journey. All Rights Reserved
          </div>
        </div>
        </div>             
      </div>
    </footer>      
  );
}