import React from "react";
import RootComment from "./RootComment";

export default function CommentList ({comments}) {
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
          key={comment.id} 
          comment={comment} 
          replies={getReplies(comment.id)}
        />
      ))
    }
    

    <div className="flex">      
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>Sarah</strong> <span className="text-xs text-gray-400">3:34 PM</span>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt ut labore et dolore
          magna aliquyam erat, sed diam voluptua.
        </p>
        
        <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4>

        <div className="space-y-4">
          <div className="flex">           
            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Sam</strong> <span className="text-xs text-gray-400">4:34 PM</span>
              <p className="text-xs sm:text-sm">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                magna aliquyam erat, sed diam voluptua.
              </p>
            </div>
          </div>
          <div className="flex">            
            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>Lana</strong> <span className="text-xs text-gray-400">5:34 PM</span>
              <p className="text-xs sm:text-sm">
              <strong> to @Sam: </strong>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore
                magna aliquyam erat, sed diam voluptua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
  )
}