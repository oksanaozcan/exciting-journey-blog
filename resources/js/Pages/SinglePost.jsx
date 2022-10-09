import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import Tag from '@/Components/ui/Tag';
import SinglePostSlider from '@/Components/client/SinglePostSlider';
import CategoryLink from '@/Components/ui/CategoryLink';
import CommentList from '@/Components/client/CommentList';
import Pagination from '@/Components/client/Pagination';
import AddNewCommentForm from '@/Components/client/AddNewCommentForm';
import PlusIcon from '@/Components/icons/PlusIcon';
import ReactTooltip from 'react-tooltip';
import FilledLikeIcon from '@/Components/icons/FilledLikeIcon';
import LikeIcon from '@/Components/icons/LikeIcon';
import SimilarPostGroup from '@/Components/client/SimilarPostGroup';
import Htag from '../Components/Htag/Htag';

export default function SinglePost (props) {
  const post = useMemo(() => props.post, []);    
  const {is_liked, similar_posts} = props;

  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 
  const [comments, setComments] = useState([]); 
  const [offset, setOffset] = useState(0);
  const commentInput = useRef(null);

  useEffect(() => {
    setIsLiked(is_liked);
  }, []);

  useEffect(() => {
    setCountLikes(post.likes_count);
  }, [])

  const onFocusInput = () => {
    commentInput.current.focus();
  } 

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);   
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);  

  const onVisibleButton = () => {
    if (offset > window.innerHeight) {
      return '';
    } else {
      return 'hidden';
    }
  }
  
  const navToggle = () => {   
    setIsOpen(!isOpen);    
  }   

  useEffect(() => {
    setComments(props.comments.data);
  }, [props]);

  const Content = () => <div dangerouslySetInnerHTML={{ __html: post.content }}/>

  return (
      <>
        <Head title={post.title} />
      
        <section id='posts'>
          <div className="container max-w-6xl mx-auto px-6 py-12 mb-4">
            <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>              
          </div>
        </section>

        <section id='single-post'>
          <div className="container bg-white max-w-6xl mx-auto px-6 py-12">
            <div className='flex flex-col my-4'>
              <div className='w-full flex flex-row justify-between'>      
                <Htag tag='h1'>{post.title}</Htag>                           
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
            <div className='my-4 flex flex-row justify-between'>
              {
                isLiked ?
                <div>                 
                  <Link href={`/likes/${post.id}`} method="post" as="button" type="button" preserveScroll preserveState={false} 
                    data={{ model: 'App\\Models\\Post' }}
                  >
                    <FilledLikeIcon/>
                    <span>{countLikes}</span>
                  </Link>
                </div>
                 :
                <div>                 
                  <Link href={`/likes/${post.id}`} method="post" as="button" type="button" preserveScroll preserveState={false}
                    data={{ model: 'App\\Models\\Post' }}
                  >
                    <LikeIcon/>
                    <span>{countLikes}</span>
                  </Link>
                </div>               
              }
              <div className='text-blue-700'>
                Total Visits: {post.visits_count}
              </div>
            </div>       
            <SimilarPostGroup similar_posts={similar_posts} />  
          </div>          
        </section>
        
        <section className='relative' id='comment-list'>
          <AddNewCommentForm 
            postId={post.id} 
            useForm={useForm} 
            usePage={usePage}
            commentInput={commentInput}
          /> 
          <button 
            data-tip="Comment"
            data-for="focusBtnTip"
            data-iscapture="true"
            type='button' 
            className={`${onVisibleButton()} fixed px-1 py-1 rounded-full text-white bottom-2/4 right-8 bg-blue-400/50 hover:bg-blue-600 font-bold border border-blue-600/50 duration-150`}
            onClick={onFocusInput}
          >            
            <PlusIcon/>           
          </button>
          <ReactTooltip id="focusBtnTip" place="top" type='dark' effect="float" delayShow={300}/>
          <CommentList comments={comments}
            postId={post.id} 
            useForm={useForm} 
            usePage={usePage}
          />
          <Pagination items={props.comments}/>
        </section>       
        <Footer/>
      </>
  );
}