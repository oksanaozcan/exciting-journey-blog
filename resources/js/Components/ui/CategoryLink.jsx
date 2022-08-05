import React from "react";

export default function CategoryLink ({category}) {
  return(
    <a className='w-1/5 h-14 md:h-16' href={`/categories/${category.id}`}>
      <img className='object-cover rounded-lg md:h-16' src={category.preview}/>
    </a>      
  )
}