import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import Tag from '@/Components/ui/Tag';
import SinglePostSlider from '@/Components/client/SinglePostSlider';
import CategoryLink from '@/Components/ui/CategoryLink';

export default function SinglePost (props) {
  const post = useMemo(() => props.post, []);  
  const [isOpen, setIsOpen] = useState(false);   

  const navToggle = () => {   
    setIsOpen(!isOpen);    
  }  

  const Content = () => <div dangerouslySetInnerHTML={{ __html: post.content }}/>

    return (
        <>
          <Head title="Exciting Journey" />
       
          <section id='posts'>
            <div className="container max-w-6xl mx-auto px-6 py-12 mb-4">
              <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>              
            </div>
          </section>

          <section id='single-post'>
            <div className="container bg-white max-w-6xl mx-auto px-6 py-12">
              <div className='flex flex-col my-4'>
                <div className='w-full flex flex-row justify-between'>                  
                  <h6 className='text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'>{post.title}</h6>     
                  <CategoryLink category={post.category}/>                                                        
                </div>
                <div className='flex flex-row w-full justify-between mt-4'>
                  <small className='text-gray-900 text-sm font-mono md:text-base'>{post.author}</small>
                  <small className='text-slate-600 text-sm font-mono md:text-base'>{post.created_at}</small>
                </div>   
                <div className='flex flex-row my-4 justify-center'>
                  {
                    post.tags?.map(tag => (
                      <Tag key={tag.id} tag={tag}/>
                    ))
                  }        
                </div>           
              </div>  
              <div className='flex flex-col items-center'>
                <div className='mx-8'>
                  <img className='w-full h-18 mb-4' src={post.preview}/>
                </div>                 
                <div className='my-4'>
                  <p className='text-left italic'>
                    {post.description}
                  </p>                  
                </div>               
              </div>         

              <div className='my-4'>
                <SinglePostSlider pictures={post.pictures}/>
              </div>    
              
              <div>
                <Content/>
              </div>            
            </div>       
          
          </section>
          <Footer/>
        </>
    );
}