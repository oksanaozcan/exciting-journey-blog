import React, {useState, useEffect} from "react";
import { Inertia } from '@inertiajs/inertia';
import { useContext } from "react";
import {LangContext} from '../../Context/LangContext';

export default function AddNewCommentForm ({postId, useForm, usePage, commentInput, parentId = null, setIsActiveReplyForm = null, isArticle=false}) {
  const {lang} = useContext(LangContext);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');

  const { data, setData, progress, processing } = useForm({
    message: '',
    parent_id: parentId,   
    commentable_id: postId,   
    commentable_type: isArticle ? 'App\\Models\\Article' : 'App\\Models\\Post'
  })

  useEffect(() => {
    setData('message', newComment)    
  }, [newComment, setNewComment])

  const { errors } = usePage().props;

  function submit(e) {
    e.preventDefault();         
    
    if (email === '') {
      Inertia.post('/comments', data, {
        preserveScroll: true,
        onSuccess: () => {
          setNewComment('');
        },
        onFinish: () => {
          Inertia.reload({ only: ['comments'] })
          if (setIsActiveReplyForm) {
            setIsActiveReplyForm(false);
          } 
        }
      });    
    } else {
      Inertia.visit('/');
    }
    
  } 

  return (
    <div className="container bg-white max-w-6xl mx-auto px-4 py-4 mt-4 shadow-xl">
      <form onSubmit={submit} className="w-full p-4">
        <div className="relative">
          <input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" className="absolute bottom-0 right-1/2 opacity-0 w-0.5 h-0.5"/>
        </div>
        <div className="mb-2">         
          <textarea 
            className="w-full h-20 p-4 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            placeholder={lang.get('comment.add_comment')}
            required
            maxLength={1000}
            onChange={e => setNewComment(e.target.value)}
            value={newComment}
            ref={commentInput}
            ></textarea>
            {errors.message && <div className='text-sm text-red-800 mb-4'>{errors.message}</div>}            
        </div>               

        {progress && (
          <progress value={progress.percentage} max="100">
            {progress.percentage}%
          </progress>
        )}
        <div className="flex flex-row justify-between">
          <button 
            type="submit"
            className=" btn"
            disabled={processing}
            >
              {lang.get('comment.add_comment')}
          </button>
          <small
            className={newComment.length <= 1000 ? 'text-green-800' : 'text-red-800'}
          >
            {newComment.length}/1000
          </small>
        </div>

      </form>
    </div>         
  )
}