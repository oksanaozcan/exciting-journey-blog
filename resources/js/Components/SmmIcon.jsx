import React from "react";

export default function SmmIcon ({path, img}) {
  return (
    <div className='h-8 group'>
      <a href={path}>
        <img src={img} alt="#" className='h-6'/>
      </a>
    </div>
  );
}