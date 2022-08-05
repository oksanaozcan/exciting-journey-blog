import React from "react";

export default function SeeAllLink ({classes, route, title}) {
  return (
    <a
      href={route}
      type='button'
      className={`btn text-center ${classes}`}>
        {
          title ?
          title :
          'See All'
        }        
    </a>
  )
}