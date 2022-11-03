import React from "react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import MyNavlink from '@/Components/client/MyNavlink';
import { useContext } from "react";
import { LangContext } from "../../app";
import Select from 'react-select';
import { useState, useMemo } from "react";

export default function Navbar ({isOpen, navToggle, authProps}) {
  const {lang, locales} = useContext(LangContext);
  
  const [localesList, setLocalesList] = useState(locales.map(i => ({value: i, label: i})))
  const [selectedLocale, setSelectedLocale] = useState(lang.getLocale());   
  
  const isOpenHandler = () => {
    navToggle();
  } 
 
  return (
    <>
      <nav className="flex items-center justify-between font-bold text-white">
        <ApplicationLogo className="fill-current text-gray-500 rounded-full"/>
        <div className="hidden h-10 md:flex md:space-x-8">
          <MyNavlink path={route('main')} title={"Home"}/>
          <MyNavlink path={route('client.post.index')} title={lang.get('test.test')}/>
          <MyNavlink path={route('client.category.index')} title={"Categories"}/>
          <MyNavlink path={route('client.tag.index')} title={"Tags"}/>
          <MyNavlink path={route('client.article.index')} title={"Articles from readers"}/>
          {
            authProps ?
              <>
                <MyNavlink path={route('dashboard')} title={"Dashboard"}/>              
                <MyNavlink path={route('article.subscribers')} title={"Subscribers"}/>              
              </>
              :
              <>
                <MyNavlink path={route('login')} title={"Login"}/>
                <MyNavlink path={route('register')} title={"Register"}/>            
              </> 
          }           
          <Select           
            className='mb-4'            
            defaultValue={localesList.filter(i => i.value == selectedLocale)}                
            onChange={newValue => {
              let newLoc = Object.values(newValue)[0];
              lang.setLocale(newLoc)
              setSelectedLocale(newLoc)
            }}            
            options={localesList}              
          />                    
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
        <MyNavlink classes={'hover:text-pink-500'} path={route('main')} title={"Home"}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.post.index')} title={"All Posts"}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.category.index')} title={"Categories"}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.tag.index')} title={"Tags"}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.article.index')} title={"Articles from readers"}/>
        {
          authProps ?
            <>
              <MyNavlink classes={'hover:text-pink-500'} path={route('dashboard')} title={"Dashboard"}/>
              <MyNavlink classes={'hover:text-pink-500'} path={route('article.subscribers')} title={"Subscribers"}/>
            </>
            :
            <>
              <MyNavlink classes={'hover:text-pink-500'} path={route('login')} title={"Login"}/>
              <MyNavlink classes={'hover:text-pink-500'} path={route('register')} title={"Register"}/>            
            </> 
        }            
         
      </div>    
    </>
  )
}