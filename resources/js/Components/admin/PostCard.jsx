import React from "react";
import Tag from "@/Components/ui/Tag";
import SinglePostSlider from "../client/SinglePostSlider";

export default function PostCard ({post, commentsCount, onDeletePost, isAllowedDelete}) {  

  const Content = () => <div dangerouslySetInnerHTML={{ __html: post.content }}/>

  return(
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full flex flex-row justify-between">
        <img className="w-1/4" src={post.preview}/> 
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">{post.title}</h5>   
          <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">Category: {post.category.title}</h6>
          <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4"> Tags:
            {
              post.tags.map(tag => (
                <Tag key={tag.id} tag={tag}/>
              ))
            }
          </div>
          <div className="flex flex-row justify-between">
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">Author {post.author}</h6>
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">{post.created_at}</h6>
          </div>
          <div className="px-4 pt-4">
            <p>Value of comments: {commentsCount}</p>
          </div>
        </div>                    
      </div>                
      <div className="p-5">                                                                 
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.description}</p>
        <SinglePostSlider pictures={post.pictures}/>
        <Content/>          
      </div>
      <div className="flex flex-col w-full">
        <a className="btn my-2 text-center" href={`/admin/posts/${post.id}/edit`}>Edit</a>
        {
          isAllowedDelete ?
          <button type="button" className='btn my-2' onClick={() => onDeletePost(post.id)}>Delete</button> :
          null
        }       
      </div>
    </div>          
  )
} 