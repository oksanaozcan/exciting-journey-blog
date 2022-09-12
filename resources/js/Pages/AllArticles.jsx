import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import PostListItem from '@/Components/client/PostListItem';

import Pagination from '@/Components/client/Pagination';
import FollowCard from '@/Components/client/FollowCard';

export default function AllArticles({all_articles, auth, author=false, is_followings}) {
  const articles = useMemo(() => all_articles, []);  
  const authorArticles = useMemo(() => author, []);  
  const [isOpen, setIsOpen] = useState(false);  

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }  
    return (
        <>
          <Head title="Articles" />       
          <section id='posts'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Navbar isOpen={isOpen} navToggle={navToggle} authProps={auth.user}/>              
            </div>
          </section>

          <section id='post-list'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              {
                articles.data.length <= 0 ?
                <div className='text-lg text-center w-full mr-2 font-bold text-sky-900 md:text-2xl'>No subscribtions</div> 
                : null
              }
              {
                authorArticles ?
                <FollowCard 
                  isFollowings = {is_followings}
                  authorArticles={authorArticles}
                /> :
                null
              }             
              {
                articles.data.map(item => (
                  <PostListItem key={item.id} post={item} isArticle={true}/>
                ))
              }  
              <Pagination items={articles}/>
            </div>
          </section>
          <Footer/>
        </>
    );
}