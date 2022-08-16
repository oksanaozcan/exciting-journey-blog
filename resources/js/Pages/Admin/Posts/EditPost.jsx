import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useMemo, useEffect, useState, useCallback} from "react";
import Authenticated from '@/Layouts/Authenticated';
import Sidebar from '@/Layouts/Sidebar';
import no_image from '../../../../../public/images/no_image.svg'
import CrossIcon from '@/Components/icons/CrossIcon';
import Select from 'react-select';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import {useDropzone} from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { bytesToHuman, getFields } from '@/helpers/helperFunctions';

// DropzoneFix.tsx
import Dropzone from 'react-dropzone-uploader';
import { convertFromHTML } from 'draft-convert';
import BanIcon from '@/Components/icons/BanIcon';
function fixComponent(component) {
    return (component).default ?? component;
}
export const DropzoneFix = fixComponent(Dropzone);

export default function EditPost (props) {
  const categories = useMemo(() => props.categories, []);      
  const tags = useMemo(() => props.tags, []);
  const bindedPictures = useMemo(() => props.postPictures, []);
  const [newPreview, setNewPreview] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorState, setEditorState] = useState(   
    () => {           
      return EditorState.createWithContent(convertFromHTML(props.post.content))
    }      
  );
  const [dropedFiles, setDropedFiles] = useState([]);
  const [removedBindedPictures, setRemovedBindedPictures] = useState([]);
  
  const { errors } = usePage().props;

  const { data, setData, post, progress, processing } = useForm({
    title: props.post.title,
    preview: null,
    description: props.post.description,
    content: props.post.content,
    category_id: props.post.category,
    pictures: [],
    tags: props.postTags,
    removed_pictures: []
  })

  useEffect(() => {
    setSelectedCategory(props.post.category)
    setSelectedTags(props.postTags)
  },[])

  useEffect(() => {
    setData('category_id', selectedCategory)
  }, [selectedCategory, setSelectedCategory])   

  useEffect(() => {
    setData('tags', getFields(selectedTags))   
  }, [selectedTags, setSelectedTags]) 

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

  useEffect(() => {
    setData('pictures', dropedFiles)
  }, [dropedFiles, setDropedFiles])

  useEffect(() => {
    setData('removed_pictures', removedBindedPictures)
  }, [removedBindedPictures, setRemovedBindedPictures])

  function submit(e) {
    e.preventDefault()    
    post(`/admin/posts/${props.post.id}`);
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

  const toggleRemoveBindedPictures = (picture) => {
    if (removedBindedPictures.some(obj => obj.id === picture.id)) {
      let newState = removedBindedPictures.filter(item => item.id !== picture.id);
      setRemovedBindedPictures(newState); 
    } else {
      setRemovedBindedPictures(state => [
        ...state, 
        picture
      ])
    }
    
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
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>}
    >        
      <div className="grid grid-cols-5 gap-1">          
        <div className="..."> 
          <Sidebar auth={props.auth}/>
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
                      <img className='w-1/2 h-1/2 object-cover rounded-lg filter grayscale blur-sm' src={props.post.preview} alt="preview" />
                      </> :
                      <>
                      <h6>Preview Image</h6>
                      <img className='w-full h-1/2 object-cover rounded-lg' src={props.post.preview} alt="preview" />
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

                <label htmlFor="select_category">Select Category</label>
                <Select
                  name='category_id'
                  id='select_category'
                  className='mb-4'
                  isSearchable
                  isClearable
                  defaultValue={data.category_id}
                  onChange={setSelectedCategory}            
                  getOptionLabel={option => option.title}
                  getOptionValue={option => option.id}
                  options={categories}              
                />
                {errors.category_id && <div className='text-sm text-red-800 mb-4'>{errors.category_id}</div>}

                <label htmlFor="select_tags">Select Tags</label>
                <Select
                  name='tags[]'
                  id='select_tags'
                  className='mb-4'
                  isMulti                 
                  defaultValue={data.tags}
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

                <h6>Edit Pictures</h6>
                <div className='flex flex-col border-dashed border-2 border-gray-400 px-4 py-4 mb-4'>
                  <small>Binded Pictures</small>                  
                  <div className='flex flex-row flex-wrap'>
                    {
                      bindedPictures.map(picture => (
                        removedBindedPictures.some(item => item.id === picture.id) 
                        ?
                        <div key={picture.id} className="relative w-16 my-2 mx-auto">
                          <img src={picture.path} alt="picture" className='filter grayscale blur-sm'/>
                          <button onClick={() => toggleRemoveBindedPictures(picture)} type='button' className='absolute -right-10 -top-4 btn m-1 p-1'><BanIcon/></button>
                        </div>
                        :
                        <div key={picture.id} className="relative w-16 my-4 mx-auto">
                          <img src={picture.path} alt="picture" className=''/>
                          <button onClick={() => toggleRemoveBindedPictures(picture)} type='button' className='absolute -right-10 -top-4 btn m-1 p-1'><CrossIcon/></button>
                        </div>
                      ))
                    }                                                
                  </div>

                    {
                      removedBindedPictures.length > 0 && 
                      <strong className='text-yellow-500 my-4'>Warning: You are about delete checked pictures from this post and database, but not from storage!</strong>
                    }    

                  <div className='h-36 bg-white mb-4 border-4 border-dotted border-indigo-500/100 rounded-md font-bold text-center flex justify-center items-center' {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                  </div>
                  {selected_images}
                </div>                

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