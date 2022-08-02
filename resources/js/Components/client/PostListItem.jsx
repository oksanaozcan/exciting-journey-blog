import React from "react";

export default function PostListItem ({post}) {
  return (
    <div className='border-b-4 border-black flex flex-col items-center my-4 py-4'>
      <div className='w-full flex flex-row justify-between'>                  
        <h6 className='text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'>{post.title}</h6>                                  
        <img className='w-1/5 object-cover h-14 rounded-lg md:h-16' src={post.category_preview}/>                
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
          <a href="#!" className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Read More</a>
          <a href="#!" className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">Comments: 15</a>
        </div>
      </div>
    </div>
  )
}