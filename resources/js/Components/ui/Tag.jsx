import React from "react";

export default function Tag ({tag}) {
  return (    
    <a
      href={`/tags/${tag.id}`}
      className="mx-4 my-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-6 py-2 bg-blue-200 text-blue-700 rounded-full"
    >   
      {tag.title}
    </a>
  )
}