import React, {useState, useEffect} from "react";
import { Inertia } from '@inertiajs/inertia';

export default function AddNewCommentForm ({postId, useForm, usePage, commentInput}) {

  const [newComment, setNewComment] = useState('');

  const { data, setData, progress, processing } = useForm({
    message: '',
    parent_id: null,   
    post_id: postId,   
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

  return (
    <div className="container bg-white max-w-6xl mx-auto px-4 py-4 mt-4 shadow-xl">
      <form onSubmit={submit} className="w-full p-4">
        <div className="mb-2">         
          <textarea 
            className="w-full h-20 p-4 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
            placeholder="Add a comment"
            required
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

        <button 
          type="submit"
          className=" btn"
          disabled={processing}
          >
            Add comment
        </button>
      </form>
    </div>         
  )
}