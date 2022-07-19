import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import CategoryItem from '@/Components/CategoryItem';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import CommentsGrid from '@/Components/CommentsGrid';

export default function Welcome(props) {
  const [isOpen, setIsOpen] = useState(false);

  const navToggle = () => {
    setIsOpen(!isOpen);    
  }
  
    return (
        <>
          <Head title="Exciting Journey" />
       
          <section id='hero'>
            <div className="container max-w-6xl mx-auto px-6 py-12">
              <Navbar isOpen={isOpen} navToggle={navToggle}/>
              <div className='max-w-lg mt-32 mb-32 p-4 font-sans text-4xl text-white uppercase border-2 border-slate-500/50 md:p-10 md:m-32 md:mx-0 md:text-6xl bg-slate-900/50'>
                {
                  props.auth.user ? 
                  (
                    <div className='flex flex-col justify-center'>
                      <div className='text-base my-2 text-center'>Welcome Back {props.auth.user.name}</div>
                      <Link href={route('dashboard')} className="btn text-base my-2 text-center">
                        Dashboard
                      </Link>
                    </div>                    
                  ) : 
                  (                    
                    <div className='flex flex-col'>
                      <Link href={route('login')} className="btn text-base my-2 text-center">
                        Log in
                      </Link>
                      <Link href={route('register')} className="btn text-base my-2 text-center">
                        Register
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </section>

          <section id='feature'>
            <div className='relative container flex flex-col max-w-6xl mx-auto my-32 px-6 text-gray-900 md:flex-row md:px-0'>
              <img className='contrast-75' src="images/camper.jpg" alt="" />
              <div className="top-40 pr-0 bg-white md:absolute md:right-0 md:py-10 md:pl-20">
                <h2 className='max-w-lg mt-10 mb-6 font-sans text-4xl text-center text-gray-900 uppercase md:text-5xl md:mt-0 md:text-left'>
                The standard Lorem Ipsum passage.
                </h2>
                <p className='max-w-md text-center md:text-left'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </section>

          <section id='categories'>
            <div className="container max-w-6xl mx-auto my-32 px-6 text-gray-900 md:px-0">
              <div className='flex justify-center mb-20 md:justify-between'>
                <h2 className='text-4xl text-center uppercase md:text-left md:text-5xl'>
                  Our Category
                </h2>
                <button 
                  className='hidden btn md:block'>
                    See All
                </button>
              </div>
              <div className='category-container'>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>               
              </div>
              <div className='category-container mt-10'>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>
                <CategoryItem img={'images/feature.jpg'} title={'Name of Category'}/>               
              </div>
              <div className='flex justify-center mt-10 md:hidden'>
              <button className='btn w-full md:hidden'>See All</button>
              </div>
            </div>
          </section>

          <section id='comments'>
            <CommentsGrid/>
          </section>

          <Footer/>
        </>
    );
}

{/* <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 underline">
                                Log in
                            </Link>

                            <Link href={route('register')} className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>               
            </div> */}
