import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Pagination from "../Pagination";

const MyActivity = ({myComments}) => {
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    setLocalComments(myComments.data);   
  }, [])

  return (    
    <>
    <h2 className="mb-4">My Comments: </h2>
    <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {
        localComments.map(comment => (
          <Link 
            key={comment.id}
            href={`/posts/${comment.post_id}`} 
            className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <strong>{comment.time_for_human}: </strong> {comment.message}
          </Link>
        ))
      }        
    </div>  
    <div>
      <Pagination items={myComments}/>
    </div>   
    </>
  )
}

export default MyActivity;