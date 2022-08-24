import DotsCircleIcon from '@/Components/icons/DotsCircleIcon';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dropdownData from '@/data/dropdownData';
import { getName } from '@/helpers/helperFunctions';

export default function Sidebar({auth}) {
  const [dropdownLinks, setDropdownLinks] = useState([]);

  useEffect(() => {
    setDropdownLinks(dropdownData);
  }, []);

  const checkPerm = (arrayFromLink) => {
    const permissionName = getName(auth.user.roles);
    const checker = [];
    arrayFromLink.forEach(name => {
      if (permissionName.includes(name)) {
        checker.push(true);
      } else {
        checker.push(false)
      }
    })    
    return checker
  }

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
                    style={checkPerm(link.permissionFor).includes(true) ? { display:'flex'} : {display : 'none'} }
                  >
                    {link.icon}
                    <span className="flex-1 ml-3 whitespace-nowrap">{link.title}</span>
                  </button>
                  <div className={link.dropdown ? 'block' : 'hidden'}>
                    <ul>
                      {
                        link.links.map(a => (
                          <li className='flex flex-row items-center' key={a.id}>                            
                            <a 
                              className='my-2 flex flex-row mx-2' 
                              href={route(a.route)}
                              style={checkPerm(a.permissionFor).includes(true) ? { display:'flex'} : {display : 'none'} }
                            >
                              <DotsCircleIcon/>
                              {a.title}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </li> 
                )
              )  
            }                     
          </ul>
      </div>
    </aside>
  );
}              