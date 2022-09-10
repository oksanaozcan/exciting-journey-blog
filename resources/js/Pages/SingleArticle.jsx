import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/client/Navbar';
import Footer from '@/Components/client/Footer';
import CommentList from '@/Components/client/CommentList';
import Pagination from '@/Components/client/Pagination';
import AddNewCommentForm from '@/Components/client/AddNewCommentForm';
import PlusIcon from '@/Components/icons/PlusIcon';
import ReactTooltip from 'react-tooltip';
import FilledLikeIcon from '@/Components/icons/FilledLikeIcon';
import LikeIcon from '@/Components/icons/LikeIcon';
import SimilarPostGroup from '@/Components/client/SimilarPostGroup';

export default function SingleArticle (props) {
  const article = useMemo(() => props.article, []);    
  const {
    is_liked,     
    similar_articles,
  } = props;

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
    setCountLikes(article.likes_count);
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

  const Content = () => <div dangerouslySetInnerHTML={{ __html: article.content }}/>

  return (
      <>
        <Head title={article.title} />
      
        <section id='posts'>
          <div className="container max-w-6xl mx-auto px-6 py-12 mb-4">
            <Navbar isOpen={isOpen} navToggle={navToggle} authProps={props.auth.user}/>              
          </div>
        </section>

        <section id='single-post'>
          <div className="container bg-white max-w-6xl mx-auto px-6 py-12">
            <div className='flex flex-col my-4'>
              <div className='w-full flex flex-row justify-between'>                  
                <h6 className='text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'>{article.title}</h6>                     
              </div>
              <div className='flex flex-row w-full justify-between mt-4'>
                <Link href={route('client.article.index.from.user', article.author_id)}>
                  <small className='text-gray-900 text-sm font-mono md:text-base'>{article.author}</small>
                </Link>                
                <small className='text-slate-600 text-sm font-mono md:text-base'>{article.created_at}</small>
              </div>                    
            </div>  
            <div className='flex flex-col items-center'>
              <div className='mx-8'>
                <img className='w-full h-18 mb-4' src={article.preview}/>
              </div>                 
              <div className='my-4'>
                <p className='text-left italic'>
                  {article.description}
                </p>                  
              </div>               
            </div>                    
            
            <div>
              <Content/>
            </div>   
            <div className='my-4 flex flex-row justify-between'>
              {
                isLiked ?
                <div>                 
                  <Link href={`/likes/article/${article.id}`} method="post" as="button" type="button" preserveScroll preserveState={false}
                    data={{ model: 'App\\Models\\Article' }}
                  >
                    <FilledLikeIcon/>
                    <span>{countLikes}</span>
                  </Link>
                </div>
                 :
                <div>                 
                  <Link href={`/likes/article/${article.id}`} method="post" as="button" type="button" preserveScroll preserveState={false}
                    data={{ model: 'App\\Models\\Article' }}
                  >
                    <LikeIcon/>
                    <span>{countLikes}</span>
                  </Link>
                </div>               
              }
              <div className='text-blue-700'>
                Total Visits: {article.visits_count}
              </div>
            </div>       
            <SimilarPostGroup similar_posts={similar_articles} isArticle={true}/>  
          </div>          
        </section>
        
        <section className='relative' id='comment-list'>
          <AddNewCommentForm 
            isArticle={true}
            postId={article.id} 
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
            postId={article.id} 
            useForm={useForm} 
            usePage={usePage}
            isArticle={true}
          />
          <Pagination items={props.comments}/>
        </section>       
        <Footer/>
      </>
  );
}