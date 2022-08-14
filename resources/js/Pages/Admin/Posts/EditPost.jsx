import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import React, {useMemo, useEffect, useState} from "react";
import Authenticated from '@/Layouts/Authenticated';
import Sidebar from '@/Layouts/Sidebar';
import no_image from '../../../../../public/images/no_image.svg'
import CrossIcon from '@/Components/icons/CrossIcon';

export default function EditPost (props) {
  const categories = useMemo(() => props.categories, []);      
  const tags = useMemo(() => props.tags, []);
  
  const { errors } = usePage().props;

  const { data, setData, post, progress, processing } = useForm({
    title: props.post.title,
    preview: null,
    // description: "",
    // content: "",
    // category_id: "",
    // pictures: [],
    // tags: []
  })

  const [newPreview, setNewPreview] = useState({});
  useEffect(() => {    
    const binaryData = []
    binaryData.push(data.preview)            
    const objectUrl = window.URL.createObjectURL(new Blob(binaryData))
    setNewPreview(objectUrl)    
    return () => window.URL.revokeObjectURL(objectUrl)    
  }, [data.preview])

  function submit(e) {
    e.preventDefault()    
    console.log(data)
    post(`/admin/posts/${props.post.id}`);
  }

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
            
                <input type="text"  
                  className="create-post-input mb-4" 
                  onChange={e => setData('title', e.target.value)}
                  value={data.title}
                />
                {errors.title && <div className='text-sm text-red-800 mb-4'>{errors.title}</div>}

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
                
                
                {/* <textarea                
                  rows="4" 
                  className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Description of post..."
                  onChange={e => setData('description', e.target.value)}
                >
                </textarea>
                {errors.description && <div className='text-sm text-red-800 mb-4'>{errors.description}</div>} */}

                {/* <label htmlFor="select_category" className="">Select Category</label>
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
                {errors.category_id && <div className='text-sm text-red-800 mb-4'>{errors.category_id}</div>} */}

                {/* <label htmlFor="select_tags" className="">Select Tags</label>
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
                {errors.tags && <div className='text-sm text-red-800 mb-4'>{errors.tags}</div>} */}


                {/* <Editor
                  editorState={editorState}                  
                  wrapperClassName="bg-white p-2 mb-4"                  
                  onEditorStateChange={setEditorState}                   
                /> */}
{/* 
                <div className='h-36 bg-white mb-4 border-4 border-dotted border-indigo-500/100 rounded-md font-bold text-center flex justify-center items-center' {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                </div>
                {selected_images} */}

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