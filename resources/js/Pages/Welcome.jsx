import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import CategoryItem from '@/Components/client/CategoryItem';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import PostsGrid from '@/Components/client/PostsGrid';
import LatestPostsSlider from '@/Components/client/LatestPostsSlider';
import SeeAllLink from '@/Components/ui/SeeAllLink';
import Htag from '../Components/Htag/Htag';
import { LangContext } from '../Context/LangContext';

export default function Welcome(props) {
  const {lang} = useContext(LangContext);

  const [isOpen, setIsOpen] = useState(false);
  const categories = useMemo(() => props.categories, []); 
  const popularPosts = useMemo(() => props.popularPosts, []); 
  const [firstHalfCat, setFirstHalfCat] = useState([]);
  const [secondHalfCat, setSecondHalfCat] = useState([]);

  useEffect(() => {
    const middleIndex = Math.ceil(categories.length / 2);
    setFirstHalfCat(categories.splice(0, middleIndex));
    setSecondHalfCat(categories.splice(-middleIndex));
  }, [])

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }
  
    return (
        <>
          <Head title={lang.get('welcomepage.title_page')} />
                 
          <section id='hero'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>
              <div 
                className='max-w-lg mt-32 mb-32 p-4 font-sans text-4xl text-white uppercase border-2 border-slate-500/50 md:p-10 md:m-32 md:mx-0 md:text-6xl bg-slate-900/50'
              >
                {
                  props.auth.user ? 
                  (
                    <div className='flex flex-col justify-center'>
                      <div className='text-base my-2 text-center'>{lang.get('welcomepage.welcome_back')} {props.auth.user.name}</div>
                      <Link href={route('dashboard')} className="btn text-base my-2 text-center">
                        {lang.get('navbar.dashboard')}
                      </Link>
                    </div>                    
                  ) : 
                  (                    
                    <div className='flex flex-col'>
                      <Link href={route('login')} className="btn text-base my-2 text-center">
                        {lang.get('navbar.login')}
                      </Link>
                      <Link href={route('register')} className="btn text-base my-2 text-center">
                      {lang.get('navbar.register')}
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </section>  

          <section id='feature'>         
            <div className="container max-w-6xl mx-auto mt-32 px-6 text-gray-900 md:px-0">
              <div className='flex justify-center md:justify-between'>
                <Htag tag='h2'>{lang.get('welcomepage.latest_posts')}</Htag>                
                <SeeAllLink classes={'hidden md:block'} route={route('client.post.index')}/>
              </div>             
              <div className='flex justify-center mt-10 md:hidden'>
                <SeeAllLink classes={'w-full md:hidden'} route={route('client.post.index')}/>
              </div>
            </div>
            <LatestPostsSlider latestPosts={props.latestPosts}/>           
          </section>

          <section id='categories'>
            <div className="container max-w-6xl mx-auto my-32 px-6 text-gray-900 md:px-0">
              <div className='flex justify-center mb-20 md:justify-between'>
                <Htag tag='h2'>{lang.get('welcomepage.our_categories')}</Htag>              
                <SeeAllLink classes={'hidden md:block'} route={route('client.category.index')}/>                
              </div>
              <div className='category-container'>
                {
                  firstHalfCat.map(category => (
                    <CategoryItem key={category.id} 
                      category={category}
                      forPage={'Welcome'}
                    />
                  ))
                }           
              </div>
              <div className='category-container mt-10'>
                {
                  secondHalfCat.map(category => (
                    <CategoryItem key={category.id} 
                      category={category}
                      forPage={'Welcome'}
                    />
                  ))
                }       
              </div>
              <div className='flex justify-center mt-10 md:hidden'>
                <SeeAllLink classes={'w-full md:hidden'} route={route('client.category.index')}/>
              </div>
            </div>
          </section>

          <section id='popular-posts'>            
            <PostsGrid popularPosts={popularPosts}/>
          </section>

          <Footer/>
        </>
    );
}