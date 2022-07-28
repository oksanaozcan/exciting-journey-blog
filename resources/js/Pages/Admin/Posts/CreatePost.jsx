import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useEffect, useMemo, useState} from 'react';
import Select from 'react-select';
import Authenticated from '@/Layouts/Authenticated';
import Sidebar from '@/Layouts/Sidebar';

export default function CreatePost(props) {  
  const categories = useMemo(() => props.categories, []);      
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const { errors } = usePage().props;

  const { data, setData, post, progress, processing } = useForm({
    title: "",
    preview: "",
    content: "",
    category_id: "",
    // tags: []
  })

  useEffect(() => {
    setData('category_id', selectedCategory)
  }, [selectedCategory, setSelectedCategory])
  
  function submit(e) {
    e.preventDefault()   
    post('/admin/posts')
  } 

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Post</h2>}
    >        
      <div className="grid grid-cols-5 gap-1">          
        <div className="..."> 
          <Sidebar auth={props.auth}/>
        </div>
        <div className="col-span-4 ...">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">            
              <form onSubmit={submit}>
            
                <input type="text"  
                  className="create-post-input mb-4" 
                  placeholder="Enter title" 
                  required
                  onChange={e => setData('title', e.target.value)}
                />
                {errors.title && <div className='text-sm text-red-800 mb-4'>{errors.title}</div>}

                <label className="block mb-4">
                  <span className="sr-only">Choose File Preview</span>
                  <input 
                    type="file" 
                    className="upload-file-input"
                    onChange={e => setData('preview', e.target.files[0])}
                  />
                  {errors.preview && <div className='text-sm text-red-800 mb-4'>{errors.preview}</div>}
                </label> 
                
                <textarea                
                  rows="4" 
                  className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Test text content..."
                  onChange={e => setData('content', e.target.value)}
                >
                </textarea>
                {errors.content && <div className='text-sm text-red-800 mb-4'>{errors.content}</div>}

                <label htmlFor="select_category" className="">Select Category</label>
                <Select
                  name='category_id'
                  id='select_category'
                  className='mb-4'
                  isSearchable
                  isClearable
                  defaultValue={selectedCategory}
                  onChange={setSelectedCategory}            
                  getOptionLabel={option => option.title}
                  getOptionValue={option => option.id}
                  options={categories}              
                />
                {errors.category_id && <div className='text-sm text-red-800 mb-4'>{errors.category_id}</div>}

                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}

                <button 
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  disabled={processing}
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Submit
                  </span>
                </button>          

              </form>
            </div>
          </div>        
        </div>
      </div>   
                  
    </Authenticated>
  );
}