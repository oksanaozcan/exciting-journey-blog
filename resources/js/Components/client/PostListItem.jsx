import { Link } from "@inertiajs/inertia-react";
import React from "react";
import CategoryLink from "../ui/CategoryLink";

export default function PostListItem ({post, isArticle}) {
  const category = {
    title: post.category,
    id: post.category_id,
    preview: post.category_preview
  }
  return (
    <div className='border-b-4 border-black flex flex-col items-center my-4 py-4'>
      <div className='w-full flex flex-row justify-between'>    
      {
        isArticle ?
        <Link href={`/articles/${post.id}`}>              
          <h6 className='text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'>{post.title}</h6>                                  
        </Link> 
        :
        <>
          <Link href={`/posts/${post.id}`}>              
            <h6 className='text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'>{post.title}</h6>                                  
          </Link>
          <CategoryLink category={category}/>
        </>
      }                     
      </div>
      <div className='flex flex-row w-full justify-between mt-4'>
        <small className='text-gray-900 text-sm font-mono md:text-base'>{post.author}</small>
        <small className='text-slate-600 text-sm font-mono md:text-base'>{post.for_human_date}</small>
      </div>
      <div className='w-4/5 h-0.5 bg-slate-500 my-4'></div>
      <div className='flex flex-col items-center'>
        <div className='mx-8'>
          <img className='w-full h-18 mb-4' src={post.preview}/>
        </div>                 
        <div>
          {post.description}
        </div>
        <div className='w-4/5 h-0.5 bg-slate-500 my-4'></div>
        <div className='w-full flex flex-row justify-between'>
          {
            isArticle ?
            <>
              <Link href={`/articles/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Read More</Link>
              <Link href={`/articles/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Comments: {post.comments_count}</Link>
            </>
            :
            <>
              <Link href={`/posts/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Read More</Link>
              <Link href={`/posts/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Comments: {post.comments_count}</Link>            
            </>
          }         
        </div>
      </div>
    </div>
  )
}