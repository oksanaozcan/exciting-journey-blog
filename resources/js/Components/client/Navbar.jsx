import React from "react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import MyNavlink from '@/Components/client/MyNavlink';

export default function Navbar ({isOpen, navToggle}) {
  
  const isOpenHandler = () => {
    navToggle();
  }

  return (
    <>
      <nav className="flex items-center justify-between font-bold text-white">
        <ApplicationLogo className="fill-current text-gray-500 rounded-full"/>
        <div className="hidden h-10 md:flex md:space-x-8">
          <MyNavlink path={'#'} title={"About"}/>
          <MyNavlink path={'#'} title={"Categories"}/>
          <MyNavlink path={'#'} title={"Posts"}/>
          <MyNavlink path={'#'} title={"Events"}/>
          <MyNavlink path={'#'} title={"Support"}/>                  
        </div>

        <div className='md:hidden'>
          <button type='button' id='menu-btn' 
            className={
              isOpen === false ?
              `z-40 block hamburger md:hidden focus:outline-none` :
              `z-40 open block hamburger md:hidden focus:outline-none`
            }
            onClick={isOpenHandler}
          >
            <span className='hamburger-top'></span>  
            <span className='hamburger-middle'></span>  
            <span className='hamburger-bottom'></span>  
          </button>                    
        </div>
      </nav>

      <div id='menu' 
        className={
          isOpen === false ?
          `absolute top-0 bottom-0 left-0 hidden flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black` :
          `absolute top-0 bottom-0 left-0 flex flex-col self-end w-full min-h-screen py-1 pt-40 pl-12 space-y-3 text-lg text-white uppercase bg-black`                
        }
      >
        <a href="#" className='hover:text-pink-500'>Link</a>
        <a href="#" className='hover:text-pink-500'>Link</a>
        <a href="#" className='hover:text-pink-500'>Link</a>
        <a href="#" className='hover:text-pink-500'>Link</a>
        <a href="#" className='hover:text-pink-500'>Link</a>
      </div>    
    </>
  )
}