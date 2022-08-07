import React from "react";

export default function ReplyComment ({reply}) {
  return (
    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>{reply.user_name}</strong> <span className="text-xs text-gray-400">{reply.time_for_human}</span>
      <p className="text-xs sm:text-sm"><strong>to {reply.parent_user}: </strong> {reply.message}</p>
    </div>
  )
}