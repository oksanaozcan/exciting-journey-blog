import React from "react";

export default function CommentForm () {
  return (
    <div className="container bg-white max-w-6xl mx-auto px-4 py-4 mt-4 shadow-xl">
      <form action="#" className="w-full p-4">
        <div className="mb-2">         
          <textarea className="w-full h-20 p-4 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            name="comment" placeholder="Add a comment"></textarea>
        </div>
        <button type="submit" className=" btn">Comment</button>
      </form>
    </div>
  )
}