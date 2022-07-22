import React from "react";

export default function CategoryItem ({img, title}) {
  return (
    <div className='group relative overflow-hidden md:w-1/4'>
      <img 
        style={{ height: '450px'}} 
        className='hidden w-full object-cover h-48 duration-200 md:block group-hover:scale-110' 
        src={img} alt={title} 
      />
      <img                     
        className='w-full object-cover h-20 md:hidden' 
        src={img} alt={title} 
      />
      <div className='category-layer'></div>
      <h5 className='absolute font-bold px-6 duration-200 w-52 bottom-4 md:bottom-8 md:px-10 group:hover:scale-110 group-hover:text-black'>{title}</h5>
    </div>
  )
}