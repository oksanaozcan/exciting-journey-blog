import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import Tag from '@/Components/ui/Tag';
import Pagination from '@/Components/client/Pagination';

export default function AllTags(props) {
  const tags = useMemo(() => props.tags, []);  
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

          <section id='tags-list'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              {
                tags.data.map(tag => (                  
                  <Tag key={tag.id} tag={tag}/>                                    
                ))
              }               
            </div>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Pagination items={tags}/> 
            </div>            
          </section>
          <Footer/>
        </>
    );
}