import React, {useState} from "react";
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import FollowCard from "@/Components/client/FollowCard";

export default function PublicUserProfile ({auth, author, is_followings, articles_count, visits_count, likes_count, comments_count}) {
  const [isOpen, setIsOpen] = useState(false);  

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }  

  return (
    <>
      <Head title="Author Profile" />       
      <section id='posts'>
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <Navbar isOpen={isOpen} navToggle={navToggle} authProps={auth.user}/>              
        </div>
      </section>

      <section id='post-list'>
        <div className="container max-w-6xl mx-auto px-6 py-12">
          <FollowCard auth={auth} authorArticles={author}  isFollowings={is_followings} isPublicProfilePage={true}/>          
          <h3 className="py-4 text-bold text-center">{author.name}'s Statistic as Creator:</h3>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Articles
                </th>
                <th scope="col" className="py-3 px-6">
                  Visits
                </th>
                <th scope="col" className="py-3 px-6">
                  Likes
                </th>
                <th scope="col" className="py-3 px-6">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {articles_count}
                </th>
                <td className="py-4 px-6">
                  {visits_count}
                </td>
                <td className="py-4 px-6">
                  {likes_count}
                </td>
                <td className="py-4 px-6">
                  {comments_count}
                </td>
              </tr>            
            </tbody>
          </table>

        </div>
      </section>
      <Footer/>
    </>
  )
}