import React from "react";
import LinkArrow from "@/Components/icons/LinkArrow";

export default function BtnLink ({path, title, icon}) {
  return (
    <a href={path} className="inline-flex justify-center items-center p-5 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">    
      {icon}<span className="w-full ml-1">{title}</span><LinkArrow/>
    </a> 
  );
}