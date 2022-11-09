import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useState, useEffect} from "react";
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import { Inertia } from '@inertiajs/inertia';

import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const CreateArticle = ({permissions, auth, admin}) => { 
  const [currentTitle, setCurrentTitle] = useState('');  
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );  

  const { errors } = usePage().props;

  const { data, setData, progress, processing } = useForm({
    title: "",
    preview: "",
    description: "",
    content: "",
  })

  useEffect(() => {
    setData('title', currentTitle)
  }, [currentTitle, setCurrentTitle])

  useEffect(() => {
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setData('content', content)
  }, [editorState, setEditorState]) 
  
  function submit(e) {
    e.preventDefault()    
    Inertia.post('/dashboard/my-articles', data, {
      preserveState: false
    })
  } 

  return (
    <Authenticated
      permissions={permissions}
      auth={auth}
      errors={errors}
      admin={admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Article</h2>}
    >
      <Head title="Create Article" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'my-articles'}/>
          </div>                 
          <div className="flex-initial">               
            <div className="my-2 mx-2">                  
              <div className="bg-white flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <form onSubmit={submit} className='my-4 mx-4'>
              
                  <input type="text"  
                    className="create-post-input mb-4" 
                    placeholder="Enter title" 
                    required
                    onChange={e => setCurrentTitle(e.target.value)}
                  />
                  {errors.title && <div className='text-sm text-red-800 mb-4'>{errors.title}</div>}

                  <label className="block mb-4">
                    <span className="sr-only">Choose File Preview</span>
                    <input 
                      type="file" 
                      className="upload-file-input"
                      onChange={e => setData('preview', e.target.files[0])}
                      required
                    />
                    {errors.preview && <div className='text-sm text-red-800 mb-4'>{errors.preview}</div>}
                  </label> 
                  
                  <textarea                
                    rows="4" 
                    className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Description of article..."
                    onChange={e => setData('description', e.target.value)}
                    required
                  >
                  </textarea>
                  {errors.description && <div className='text-sm text-red-800 mb-4'>{errors.description}</div>}                  

                  <Editor
                    editorState={editorState}                  
                    wrapperClassName="bg-white p-2 mb-4"                  
                    onEditorStateChange={setEditorState}                   
                  />                 

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
  )
}

export default CreateArticle;