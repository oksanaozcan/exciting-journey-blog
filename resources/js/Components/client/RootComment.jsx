import React from "react";

export default function RootComment ({comment,replies}) {
  
  return (
    <div className="flex">     
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment.user_name}</strong> <span className="text-xs text-gray-400">{comment.time_for_human}</span>
        <p className="text-sm">
          {comment.message}
        </p>
        <div className="mt-4 flex items-center">          
          <div className="text-sm text-gray-500 font-semibold">
            {replies.length} Replies ...
          </div>
        </div>
      </div>
    </div>
  )
}