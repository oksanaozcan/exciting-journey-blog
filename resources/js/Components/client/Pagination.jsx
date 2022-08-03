import React from "react";
import { Link } from "@inertiajs/inertia-react";
import PreviousArrow from '@/Components/icons/PreviousArrow';
import NextArrow from '@/Components/icons/NextArrow';

export default function Pagination ({items}) {
  return(   
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
    <div className="flex-1 flex justify-between sm:hidden">
      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
      <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
    </div>
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing {' '}
          <span className="font-medium">{items.meta.from}</span>
          {' '}to{' '}
          <span className="font-medium">{items.meta.from + (items.meta.per_page-1)}</span>
          {' '}of{' '}
          <span className="font-medium">{items.meta.total}</span>
          {' '}results
        </p>
      </div>
      <div>
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {
            items.meta.links.map((link, i) => {
              if (i === 0 || i === items.meta.links.length-1) {
                return(
                  <Link
                    key={i}
                    className={
                      link.url !== null ?
                      'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50' :
                      'relative inline-flex items-center px-2 py-2 rounded-l-md border-none border-gray-100 bg-white text-sm font-medium text-gray-300 hover:bg-gray-50'
                    }
                    href={link.url}                  
                  >
                    {
                      i === 0 ?
                      <PreviousArrow/> :
                      <NextArrow/>
                    }         
                  </Link>
                )                  
              } else {
                return (
                  <Link
                    key={i}
                    className={
                      link.active ?
                      'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium' :
                      "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    }
                    href={link.url}                  
                  >
                    {link.label}         
                  </Link>
                )
              }
            })  
          }            
        </nav>
      </div>
    </div>
  </div>
  )
}