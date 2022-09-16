import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useEffect, useState, useCallback} from "react";
import Authenticated from '@/Layouts/Authenticated';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import no_image from '../../../../../public/images/no_image.svg'
import CrossIcon from '@/Components/icons/CrossIcon';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import {useDropzone} from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { bytesToHuman } from '@/helpers/helperFunctions';

// DropzoneFix.tsx
import Dropzone from 'react-dropzone-uploader';
import { convertFromHTML } from 'draft-convert';
function fixComponent(component) {
    return (component).default ?? component;
}
export const DropzoneFix = fixComponent(Dropzone);

export default function EditArticle (props) {  
  const [newPreview, setNewPreview] = useState({});  
  const [editorState, setEditorState] = useState(   
    () => {           
      return EditorState.createWithContent(convertFromHTML(props.article.content))
    }      
  );
  const [dropedFiles, setDropedFiles] = useState([]);  
  
  const { errors } = usePage().props;

  const { data, setData, post, progress, processing } = useForm({
    title: props.article.title,
    preview: null,
    description: props.article.description,
    content: props.article.content,      
  })

  useEffect(() => {    
    const binaryData = []
    binaryData.push(data.preview)            
    const objectUrl = window.URL.createObjectURL(new Blob(binaryData))
    setNewPreview(objectUrl)    
    return () => window.URL.revokeObjectURL(objectUrl)    
  }, [data.preview])

  useEffect(() => {
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setData('content', content)
  }, [editorState, setEditorState]) 
  
  function submit(e) {
    e.preventDefault()    
    post(`/dashboard/my-articles/${props.article.id}/update`, {
      preserveState: false
    });
  }

  const onDrop = useCallback(acceptedFiles => {   
    setDropedFiles(acceptedFiles.map(file => 
      Object.assign(file, {
        preview:URL.createObjectURL(file)
      })
      ))
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleRemoveFile = (preview) => {    
    setDropedFiles(dropedFiles.filter(item => item.preview !== preview)); 
  } 

  const selected_images = dropedFiles?.map(img => (
    <div key={img.preview}>
      <img src={img.preview} className="" style={{ width:"150px" }} alt="alt attr"/>
      <span className='m-auto'>
        {img.path} size: {bytesToHuman(img.size)}
      </span>
      <button onClick={() => handleRemoveFile(img.preview)} type='button' className='btn ml-2 mb-2'><CrossIcon/></button>
    </div>    
  ))

  const onRemoveNewPreview = () => {
    setData('preview', null);
  }

  return (
    <Authenticated
      permissions={props.permissions}
      auth={props.auth}
      errors={props.errors}
      admin={props.admin}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Article</h2>}
    >        
      <div className="grid grid-cols-5 gap-1">          
        <div className="..."> 
        <SidebarDashboard activeLink={'my-articles'}/>
        </div>
        <div className="col-span-4 ...">
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">            
              <form onSubmit={submit}>
                <small>Title</small>            
                <input type="text"  
                  className="create-post-input mb-4" 
                  onChange={e => setData('title', e.target.value)}
                  value={data.title}
                />
                {errors.title && <div className='text-sm text-red-800 mb-4'>{errors.title}</div>}

                <small>Preview Image</small>
                <div className='flex flex-row justify-between border-dashed border-2 border-gray-400 px-4 py-4 mb-4'>
                  <div>
                    <label className="block mb-4">
                      <span className="sr-only">Choose File Preview</span>
                      <input 
                        type="file" 
                        className="upload-file-input"
                        onChange={e => setData('preview', e.target.files[0])}
                      />
                      {errors.preview && <div className='text-sm text-red-800 mb-4'>{errors.preview}</div>}
                    </label> 
                    <div>
                      {
                        data.preview ?
                        <>
                          <h6 className='text-green-500 mb-1'>New Preview Image</h6>
                          <img className='mb-1' src={newPreview} alt="new preview" />
                          <button type='button' className='btn' onClick={onRemoveNewPreview}><CrossIcon/></button>
                        </> : 
                        <>
                          <strong className='text-red-800'>Not choisen</strong>
                          <img className='w-1/6' src={no_image} alt="not chosen" />
                        </>
                      }                    
                    </div>
                  </div>                  
                  <div className='w-1/3'>                    
                    {
                      data.preview ? 
                      <>
                      <strong className='text-red-800'>This old preview will delete from Storage</strong>
                      <img className='w-1/2 h-1/2 object-cover rounded-lg filter grayscale blur-sm' src={props.article.preview} alt="preview" />
                      </> :
                      <>
                      <h6>Preview Image</h6>
                      <img className='w-full h-1/2 object-cover rounded-lg' src={props.article.preview} alt="preview" />
                      </>                      
                    }
                  </div>
                </div>                
                
                <small>Description</small>
                <textarea                
                  rows="6" 
                  className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
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
                  type='submit'
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