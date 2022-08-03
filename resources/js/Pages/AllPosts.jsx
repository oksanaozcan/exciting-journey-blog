import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import PostListItem from '@/Components/client/PostListItem';

import Pagination from '@/Components/client/Pagination';

export default function AllPosts(props) {
  const posts = useMemo(() => props.posts, []);  
  const [isOpen, setIsOpen] = useState(false);  

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }  
    return (
        <>
          <Head title="Exciting Journey" />
       
          <section id='posts'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>              
            </div>
          </section>

          <section id='post-list'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              {
                posts.data.map(item => (
                  <PostListItem key={item.id} post={item}/>
                ))
              }  
              <Pagination items={posts}/>
            </div>
          </section>
          <Footer/>
        </>
    );
}