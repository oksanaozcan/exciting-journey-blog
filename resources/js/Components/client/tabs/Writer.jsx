import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Writer = ({myPosts}) => {
  return (
    <>
    <div className="mb-4">
      <Link
      href={route('admin.post.create')}       
      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        Create New Post
      </Link>
    </div>
    <h2 className="mb-4">My Posts: </h2>
    <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {
        myPosts.map(post => (
          <Link 
            key={post.id}
            href={`/posts/${post.id}`} 
            className="block py-2 px-4 w-full border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <strong>{post.for_human_date}: </strong> {post.title}
          </Link>
        ))
      }        
    </div>   
    </>
  )
}

export default Writer;