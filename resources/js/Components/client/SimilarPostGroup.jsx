import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const SimilarPostGroup = ({similar_posts}) => {
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    setSimilarPosts(similar_posts);
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {
        similarPosts.map(post => (
          <Link href={`/posts/${post.id}`} className="rounded overflow-hidden shadow-lg" key={post.id}>
            <img className="w-full" src={post.preview} alt={post.title}/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{post.title}</div>
              <p className="text-gray-700 text-base">
                {post.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {
                post.tags.map(tag => (
                  <span key={uuidv4()} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
                ))
              }             
            </div>
          </Link>
        ))
      }
  </div>
  )
}

export default SimilarPostGroup;