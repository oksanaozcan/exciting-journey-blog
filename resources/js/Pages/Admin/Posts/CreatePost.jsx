import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useEffect, useMemo, useState, useCallback} from 'react';
import Select from 'react-select';
import Authenticated from '@/Layouts/Authenticated';
import Sidebar from '@/Layouts/Sidebar';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import {useDropzone} from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { getFields,bytesToHuman } from '@/helpers/helperFunctions';

// DropzoneFix.tsx
import Dropzone from 'react-dropzone-uploader';
import CrossIcon from '@/Components/icons/CrossIcon';
import { Inertia } from '@inertiajs/inertia';
function fixComponent(component) {
    return (component).default ?? component;
}
export const DropzoneFix = fixComponent(Dropzone);

export default function CreatePost(props) {  
  const categories = useMemo(() => props.categories, []);      
  const tags = useMemo(() => props.tags, []);      
  
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [dropedFiles, setDropedFiles] = useState([]);

  const { errors } = usePage().props;

  const { data, setData, post, progress, processing } = useForm({
    title: "",
    preview: "",
    description: "",
    content: "",
    category_id: "",
    pictures: [],
    tags: []
  })

  useEffect(() => {
    setData('title', currentTitle)
  }, [currentTitle, setCurrentTitle])

  useEffect(() => {
    setData('category_id', selectedCategory)
  }, [selectedCategory, setSelectedCategory])

  useEffect(() => {
    setData('tags', getFields(selectedTags))   
  }, [selectedTags, setSelectedTags]) 

  useEffect(() => {
    let content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setData('content', content)
  }, [editorState, setEditorState])

  useEffect(() => {
    setData('pictures', dropedFiles)
  }, [dropedFiles, setDropedFiles])
  
  function submit(e) {
    e.preventDefault()    
    Inertia.post('/admin/posts', data, {
      preserveState: false
    })
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

  return (
    <Authenticated
      permissions={props.permissions}
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
                  placeholder="Description of post..."
                  onChange={e => setData('description', e.target.value)}
                  required
                >
                </textarea>
                {errors.description && <div className='text-sm text-red-800 mb-4'>{errors.description}</div>}

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

                <label htmlFor="select_tags" className="">Select Tags</label>
                <Select
                  name='tags[]'
                  id='select_tags'
                  className='mb-4'
                  isMulti                 
                  defaultValue={selectedTags}
                  onChange={setSelectedTags}            
                  getOptionLabel={option => option.title}
                  getOptionValue={option => option.id}
                  options={tags}              
                />
                {errors.tags && <div className='text-sm text-red-800 mb-4'>{errors.tags}</div>}


                <Editor
                  editorState={editorState}                  
                  wrapperClassName="bg-white p-2 mb-4"                  
                  onEditorStateChange={setEditorState}                   
                />

                <div className='h-36 bg-white mb-4 border-4 border-dotted border-indigo-500/100 rounded-md font-bold text-center flex justify-center items-center' {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                </div>
                {selected_images}

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