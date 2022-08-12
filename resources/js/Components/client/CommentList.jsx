import React from "react";
import RootComment from "./RootComment";

export default function CommentList ({comments, postId, useForm, usePage}) {
  const rootComments = comments.filter(comment => comment.parent_id === null);
  
  const getReplies = commentId => {
    return comments.filter(comment => comment.parent_id === commentId)
    .sort((a,b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) ;
  }

  return (
    <>
    <div className="container bg-white max-w-6xl mx-auto px-6 py-12 mt-4 mb-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

  <div className="space-y-4">
    {
      rootComments.map(comment => (
        <RootComment 
          postId={postId} 
          useForm={useForm} 
          usePage={usePage}
          key={comment.id} 
          comment={comment} 
          replies={getReplies(comment.id)}
        />
      ))
    }    
  </div>
</div>
</>
  )
}