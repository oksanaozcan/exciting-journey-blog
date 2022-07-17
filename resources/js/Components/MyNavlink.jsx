import React from "react";

export default function MyNavlink ({path, title}) {
  return (
    <div className="group">
      <a href={path}>{title}</a>
      <div className='mx-2 group-hover:border-b group-hover:border-rose-600 ease-in duration-300'></div>
    </div>
  );
}