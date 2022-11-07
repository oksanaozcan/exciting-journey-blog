import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useContext } from "react";
import { LangContext } from "../../Context/LangContext";
import Htag from "../Htag/Htag";
import CategoryLink from "../ui/CategoryLink";
import { formatDistance } from "date-fns";
import { enUS, ru } from 'date-fns/locale';

export default function PostListItem ({post, isArticle}) {
  const {lang} = useContext(LangContext);
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
          <Htag tag="h6">{post.title}</Htag>         
        </Link> 
        :
        <>
          <Link href={`/posts/${post.id}`}>              
            <Htag tag="h6">{post.title}</Htag>                                   
          </Link>
          <CategoryLink category={category}/>
        </>
      }                     
      </div>
      <div className='flex flex-row w-full justify-between mt-4'>
        {
          isArticle ?
          <Link href={route('client.article.index.from.user', post.author_id)}>
            <small className='text-gray-900 text-sm font-mono md:text-base'>{post.author}</small>
          </Link>
          :
          <small className='text-gray-900 text-sm font-mono md:text-base'>{post.author}</small>
        }
        <small className='text-slate-600 text-sm font-mono md:text-base'>
          {formatDistance(
            new Date(post.created_at), new Date(), 
            {addSuffix: true, locale: lang.getLocale() == 'en' ? enUS : ru}
          )}
        </small>
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
              <Link href={`/articles/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">{lang.get('welcomepage.read_more')}</Link>
              <Link href={`/articles/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">{lang.get('allpostspage.comments')}: {post.comments_count}</Link>
            </>
            :
            <>
              <Link href={`/posts/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">{lang.get('welcomepage.read_more')}</Link>
              <Link href={`/posts/${post.id}`} className="text-gray-800 underline decoration-1 decoration-rose-600 decoration-dotted hover:text-gray-900 hover:decoration-4 transition duration-300 ease-in-out mb-4">{lang.get('allpostspage.comments')}: {post.comments_count}</Link>            
            </>
          }         
        </div>
      </div>
    </div>
  )
}