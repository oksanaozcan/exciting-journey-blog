import { useForm } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import Tag from '@/Components/ui/Tag';
import SinglePostSlider from '@/Components/client/SinglePostSlider';
import CategoryLink from '@/Components/ui/CategoryLink';
import CommentList from '@/Components/client/CommentList';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/client/Pagination';

export default function SinglePost (props) {
  const post = useMemo(() => props.post, []);    
  const [isOpen, setIsOpen] = useState(false); 
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    setComments(props.comments.data);
  }, [props]);

  const navToggle = () => {   
    setIsOpen(!isOpen);    
  }  

  const { data, setData, progress, processing } = useForm({
    message: '',
    parent_id: null,   
    post_id: post.id,   
  })

  useEffect(() => {
    setData('message', newComment)    
  }, [newComment, setNewComment])

  const { errors } = usePage().props;

  function submit(e) {
    e.preventDefault();
    Inertia.post('/comments', data, {
      preserveScroll: true,
      onSuccess: () => {
        setNewComment('');
      },
      onFinish: () => {
        Inertia.reload({ only: ['comments'] })
      }
    });  
    
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
          
          <section id='comment-list'>

            <div className="container bg-white max-w-6xl mx-auto px-4 py-4 mt-4 shadow-xl">
              <form onSubmit={submit} className="w-full p-4">
                <div className="mb-2">         
                  <textarea 
                    className="w-full h-20 p-4 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    placeholder="Add a comment"
                    required
                    onChange={e => setNewComment(e.target.value)}
                    value={newComment}
                    ></textarea>
                    {errors.message && <div className='text-sm text-red-800 mb-4'>{errors.message}</div>}
                </div>               

                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}

                <button 
                  type="submit"
                  className=" btn"
                  disabled={processing}
                  >
                    Add comment
                </button>
              </form>
            </div>         

            <CommentList comments={comments}/>
            <Pagination items={props.comments}/>
          </section>
          <Footer/>
        </>
    );
}