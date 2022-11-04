import React from "react";
import ApplicationLogo from '@/Components/ApplicationLogo';
import MyNavlink from '@/Components/client/MyNavlink';
import { useContext } from "react";
import { LangContext } from "../../Context/LangContext";
import Select from 'react-select';
import { useState} from "react";
import { useEffect } from "react";

export default function Navbar ({isOpen, navToggle, authProps}) {
  const {lang, locales, setNewLocale} = useContext(LangContext);
  
  const [localesList, setLocalesList] = useState(locales.map(i => ({value: i, label: i})))
  const [selectedLocale, setSelectedLocale] = useState(lang.getLocale());   

  useEffect(() => {
    setSelectedLocale(lang.getLocale());
  }, [lang])
  
  const isOpenHandler = () => {
    navToggle();
  } 
 
  return (
    <>
      <nav className="flex items-center justify-between font-bold text-white">
        <ApplicationLogo className="fill-current text-gray-500 rounded-full"/>
        <div className="hidden h-10 md:flex md:space-x-8">
          <MyNavlink path={route('main')} title={lang.get('navbar.home')}/>
          <MyNavlink path={route('client.post.index')} title={lang.get('navbar.all_posts')}/>
          <MyNavlink path={route('client.category.index')} title={lang.get('navbar.categories')}/>
          <MyNavlink path={route('client.tag.index')} title={lang.get('navbar.tags')}/>
          <MyNavlink path={route('client.article.index')} title={lang.get('navbar.articles')}/>
          {
            authProps ?
              <>
                <MyNavlink path={route('dashboard')} title={lang.get('navbar.dashboard')}/>              
                <MyNavlink path={route('article.subscribers')} title={lang.get('navbar.subscribers')}/>              
              </>
              :
              <>
                <MyNavlink path={route('login')} title={lang.get('navbar.login')}/>
                <MyNavlink path={route('register')} title={lang.get('navbar.register')}/>            
              </> 
          }           
          <Select           
            className='mb-4'            
            defaultValue={localesList.filter(i => i.value == selectedLocale)}                
            onChange={newValue => {
              let newLoc = Object.values(newValue)[0];
              setNewLocale(newLoc)
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
        <MyNavlink classes={'hover:text-pink-500'} path={route('main')} title={lang.get('navbar.home')}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.post.index')} title={lang.get('navbar.all_posts')}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.category.index')} title={lang.get('navbar.categories')}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.tag.index')} title={lang.get('navbar.tags')}/>
        <MyNavlink classes={'hover:text-pink-500'} path={route('client.article.index')} title={lang.get('navbar.articles')}/>
        {
          authProps ?
            <>
              <MyNavlink classes={'hover:text-pink-500'} path={route('dashboard')} title={lang.get('navbar.dashboard')}/>
              <MyNavlink classes={'hover:text-pink-500'} path={route('article.subscribers')} title={lang.get('navbar.subscribers')}/>
            </>
            :
            <>
              <MyNavlink classes={'hover:text-pink-500'} path={route('login')} title={lang.get('navbar.login')}/>
              <MyNavlink classes={'hover:text-pink-500'} path={route('register')} title={lang.get('navbar.register')}/>            
            </> 
        }            
         
      </div>    
    </>
  )
}