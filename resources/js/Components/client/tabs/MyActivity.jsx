import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MyActivity = ({myComments}) => {
  const [uploadedComments, setUploadedComments] = useState([]);

  useEffect(() => {
    setUploadedComments(myComments);
  }, [])

  return (    
    <>
    <h2 className="mb-4">My Comments: </h2>
    <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {
        uploadedComments.map(comment => (
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
    <div className="my-4">
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Load More...
      </span>
    </button>
    </div>
    </>
  )
}

export default MyActivity;