import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function PostsGrid ({popularPosts}) {  
  return (
    <div className="container mx-auto max-w-6xl p-2 md:p-10">
      <h3 className='text-4xl text-center uppercase mb-4 md:text-left md:text-5xl'>
        Most Popular posts
      </h3>
      <div className="grid gap-6 grid-cols-1 text-white md:grid-cols-4 md:grid-rows-2">

        {/* box 0 */}
        <Link href={`/posts/${popularPosts[0].id}`} className="relative p-10 rounded-xl bg-purple-700 md:col-span-2">  
          <img src="images/quots_mark.svg" alt="#"
            className="absolute top-3 right-10 scale-125 md:top-7 md:right-24 md:scale-150"
          />
          <div className="flex z-10 space-x-4">
            <img src={popularPosts[0].preview} 
              className="w-10 h-10 roun-full ring-2 ring-purple-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[0].title}</h4>
              <p className="opacity-50">{popularPosts[0].author} {popularPosts[0].for_human_date}</p>
            </div>            
          </div>
          <p className="relative z-10 mt-6 text-xl">
            {popularPosts[0].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[0].content }}></p>            
        </Link>       
       

        {/* box 1 */}        
        <Link href={`/posts/${popularPosts[1].id}`} className="p-10 rounded-xl bg-gray-600">    
          <div className="flex space-x-4">
            <img src={popularPosts[1].preview} 
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[1].title}</h4>
              <p className="opacity-50">{popularPosts[1].author} {popularPosts[1].for_human_date}</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
          {popularPosts[1].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[1].content.slice(0, 80) }}></p>
        </Link>

        {/* box 2 */}
        <Link href={`/posts/${popularPosts[2].id}`} className="hidden p-10 rounded-xl bg-white text-gray-900 md:block md:row-span-2">        
          <div className="flex space-x-4">
            <img src={popularPosts[2].preview} 
              className="w-10 h-10 roun-full ring-2 ring-gray-500"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[2].title}</h4>
              <p className="opacity-50">{popularPosts[2].author} {popularPosts[2].for_human_date}</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
          {popularPosts[2].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[2].content }}></p>       
        </Link>

        {/* box 3 */}
        <Link href={`/posts/${popularPosts[3].id}`} className="p-10 rounded-xl bg-white text-gray-900">     
          <div className="flex space-x-4">
            <img src={popularPosts[3].preview}
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[3].title}</h4>
              <p className="opacity-50">{popularPosts[3].author} {popularPosts[3].for_human_date}</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            {popularPosts[3].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[3].content.slice(0, 10) }}></p>
        </Link>

         {/* box 4 */}
        <Link href={`/posts/${popularPosts[4].id}`} className="p-10 rounded-xl bg-gray-900 md:col-span-2"> 
          <div className="flex space-x-4">
            <img src={popularPosts[4].preview}
              className="w-10 h-10 roun-full ring-2 ring-gray-300"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[4].title}</h4>
              <p className="opacity-50">{popularPosts[4].author} {popularPosts[4].for_human_date}</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            {popularPosts[4].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[4].content }}></p>
        </Link>

        <Link href={`/posts/${popularPosts[2].id}`} className="p-10 rounded-xl bg-white text-gray-900 md:hidden">
          <div className="flex space-x-4">
            <img src={popularPosts[2].preview}
              className="w-10 h-10 roun-full ring-2 ring-gray-500"
            />
            <div className="text-sm">
              <h4 className="opacity-90">{popularPosts[2].title}</h4>
              <p className="opacity-50">{popularPosts[2].author} {popularPosts[2].for_human_date}</p>
            </div>            
          </div>
          <p className="mt-6 text-xl">
            {popularPosts[2].description}
          </p>
          <p className="mt-6 opasity-50" dangerouslySetInnerHTML={{ __html: popularPosts[2].content }}></p>
        </Link>

      </div>
    </div>
  )
}