import React, { useState } from "react";
import AddNewCommentForm from "./AddNewCommentForm";
import ReplyComment from "./ReplyComment";

export default function RootComment ({comment,replies, postId, useForm, usePage, isArticle=false}) {
  const [isVisibleReplyComment, setIsVisibleReplyComment] = useState(false);
  const [isActiveReplyForm, setIsActiveReplyForm] = useState(false);

  const toggleVisibleReplyComment = () => {
    setIsVisibleReplyComment(!isVisibleReplyComment);
  }

  const toggleActiveReplyForm = () => {
    setIsActiveReplyForm(!isActiveReplyForm);
  }
  
  return (
    <div className="flex">     
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment.user_name}</strong> <span className="text-xs text-gray-400">{comment.time_for_human}</span>
        <p className="text-sm">
          {comment.message}
        </p>
        <div className="mt-4 flex items-center justify-between my-2">
          <button 
            type="button" 
            className="text-sm text-gray-500 font-semibold"
            onClick={toggleVisibleReplyComment}
          > 
            {replies.length} Replies ...
          </button>
          <button 
            type="button" 
            className="text-sm text-gray-500 font-semibold"
            onClick={toggleActiveReplyForm}
          > 
            Reply
          </button>            
        </div>
        {
          isActiveReplyForm ?
          <AddNewCommentForm 
            parentId={comment.id}
            postId={postId} 
            useForm={useForm} 
            usePage={usePage}
            setIsActiveReplyForm={setIsActiveReplyForm}
            isArticle={isArticle}
          />
          : null
        }
        {
          replies.length > 0 && (
            <div className={isVisibleReplyComment ? 'space-y-4' : 'space-y-4 hidden'}>
              {
                replies.map(reply => (
                 <ReplyComment key={reply.id} reply={reply}/>
                ))
              }
            </div>
          )
          }       
      </div>

      


    </div>
  )
}