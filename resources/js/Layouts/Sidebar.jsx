import DotsCircleIcon from '@/Components/icons/DotsCircleIcon';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dropdownData from '@/data/dropdownData';

export default function Sidebar({auth}) {
  const [dropdownLinks, setDropdownLinks] = useState([]);

  useEffect(() => {
    setDropdownLinks(dropdownData);
  }, []);

  const toggleDropdownMenu = (id) => {
    let newState = dropdownLinks.map(link => {
      if (link.id === id && !link.dropdown) {
        return {...link, dropdown: true}
      } else if (link.id === id && link.dropdown) {
        return {...link, dropdown: false}
      } else {
        return {...link, dropdown: false}
      }
    })
    setDropdownLinks(newState);
  }

  return (     
    <aside className="w-64" aria-label="Sidebar" style={{ height: '100vh' }}>
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800" style={{ height: 'inherit' }}>
          <ul className="space-y-2 mt-4">
            <li>              
              <a className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" 
                href="/admin"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>  
                <span className="ml-3">Admin Panel</span>
              </a>               
            </li>

            {
              dropdownLinks.map(link => (
                <li key={link.id}>
                  <button 
                    type='button'
                    onClick={() => toggleDropdownMenu(link.id)}                
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    // style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
                  >
                    {link.icon}
                    <span className="flex-1 ml-3 whitespace-nowrap">{link.title}</span>
                  </button>
                  <div className={link.dropdown ? 'block' : 'hidden'}>
                    <ul>
                      {
                        link.links.map(a => (
                          <li className='flex flex-row mx-4 items-center' key={a.id}>
                            <DotsCircleIcon/>
                            <a className='mx-2 my-2' href={route(a.route)}>{a.title}</a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </li>         
              ))
            }

            






            {/* <li>
              <a href="/admin/categories" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Категории</span>
              </a>
            </li>          

            <li>
              <a href="/admin/tags" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Тэги</span>
              </a>
            </li>      

            <li>
              <Link href="/admin/posts" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Статьи</span>
              </Link>
            </li>      

            <li>
              <a href="/admin/comments" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Комментарии</span>
              </a>
            </li>      

            <li>
              <a href={route('admin.user.reader')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                style={auth.user.roles[0].name === 'admin' ? { display:'flex'} : {display : 'none'} }
              >
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Модерирование</span>
              </a>
            </li>       */}



          </ul>
      </div>
    </aside>
  );
}
