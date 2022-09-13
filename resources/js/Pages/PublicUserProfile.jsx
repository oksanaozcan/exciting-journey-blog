import React, {useState} from "react";
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';

export default function PublicUserProfile ({auth}) {
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
          
        </div>
      </section>
      <Footer/>
    </>
  )
}