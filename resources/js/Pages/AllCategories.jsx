import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import Pagination from '@/Components/client/Pagination';
import CategoryItem from '@/Components/client/CategoryItem';

export default function AllCategories(props) {
  const categories = useMemo(() => props.categories, []);  
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

          <section id='category-list'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              {
                categories.data.map(cat => (                    
                  <CategoryItem
                    key={cat.id}
                    category={cat}
                    forPage={'AllCategories'}
                  />   
                ))
              }
              <Pagination items={categories}/>              
            </div>
          </section>
          <Footer/>
        </>
    );
}