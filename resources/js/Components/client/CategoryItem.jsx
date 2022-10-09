import React from "react";
import Htag from "../Htag/Htag";

export default function CategoryItem ({category, forPage}) {
  const {id, title, preview, count_posts} = category;

  const forWelcomePageItem = forPage === 'Welcome' ?
    <a 
      className="group relative overflow-hidden md:w-1/4"
      href={`/categories/${id}`}
    >
      <img 
        style={{ height: '450px'}} 
        className='hidden w-full object-cover h-48 duration-200 md:block group-hover:scale-110' 
        src={preview} alt={title} 
      />
      <img                     
        className='w-full object-cover h-20 md:hidden' 
        src={preview} alt={title} 
      />
      <div className='category-layer'></div>
      <Htag tag="h5">{title}</Htag>     
    </a> : null

  const forAllCategoriesPageItem = forPage === 'AllCategories' ?
    <a key={id}
      className="flex flex-col my-4 group relative overflow-hidden"
      href={`/categories/${id}`}
    >                   
      <img                     
        className='w-full object-cover min-h-20 max-h-32' 
        src={preview} alt={title} 
      />
      <div className='absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:from-gray-50 group-hover:to-white group-hover:opacity-70'></div>
      <div className='absolute font-bold text-2xl px-6 duration-200 w-full bottom-4 md:bottom-8 md:px-10 group:hover:scale-110 group-hover:text-black'>
        <h5>{title}: {' '} <strong className='text-gray-500'>{count_posts} posts</strong></h5>
      </div>                    
    </a> : null

  return (
    <>
    {forWelcomePageItem}
    {forAllCategoriesPageItem}
    </>    
  )
}