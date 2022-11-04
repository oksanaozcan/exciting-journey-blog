import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import PostListItem from '@/Components/client/PostListItem';
import Pagination from '@/Components/client/Pagination';
import { useContext } from 'react';
import { LangContext } from '../Context/LangContext';

export default function AllPosts(props) {
  const {lang} = useContext(LangContext)
  const posts = useMemo(() => props.posts, []);  
  const [isOpen, setIsOpen] = useState(false);  

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }  
    return (
        <>
          <Head title={lang.get('allpostspage.title_page')} />
       
          <section id='posts'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>              
            </div>
          </section>

          <section id='post-list'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              {
                posts.data.map(item => (
                  <PostListItem key={item.id} post={item} isArticle={false}/>
                ))
              }  
              <Pagination items={posts}/>
            </div>
          </section>
          <Footer/>
        </>
    );
}