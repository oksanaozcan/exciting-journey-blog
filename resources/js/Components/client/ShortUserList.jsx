import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ShortUserList ({items}) {
  return (
    <div>      
      {
        items.data.map(item => (
          <Link 
            key={item.id}
            href={route ('client.article.index.from.user', item.id)} 
            className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >                
            {item.name}
          </Link>
        ))
      }     
    </div>
  )
}