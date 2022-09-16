import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import { useState } from 'react';
import { useEffect } from 'react';

const EditProfile = ({permissions, auth, admin, public_info}) => {

  const [newHeadline, setNewHeadline] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    setNewHeadline(public_info.headline);    
  },[])

  useEffect(() => {    
    setNewDescription(public_info.description);
  },[])

  useEffect(() => {
    setData('headline', newHeadline);
  }, [newHeadline, setNewHeadline])

  useEffect(() => {
    setData('description', newDescription);
  }, [newDescription, setNewDescription])

  const { data, setData, patch, progress, processing } = useForm({
    name: public_info.name,
    headline: public_info.headline,
    description: public_info.description,
    website: public_info.website,
    twitter: public_info.twitter,
    facebook: public_info.facebook,
    instagram: public_info.instagram,
    youtube: public_info.youtube    
  })  

  const { errors } = usePage().props;

  const submit = (e) => {
    e.preventDefault()    
    patch(`/dashboard/${auth.user.id}`, data);
  }  

  return (
    <Authenticated
      permissions={permissions}
      auth={auth}
      errors={errors}
      admin={admin}
      header={<><h2 className="font-semibold text-xl text-gray-800 leading-tight">Public profile</h2><p>Add information about yourself</p></>}
    >
      <Head title="Public profile" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'profile'}/>
          </div>                 
          <div className="flex-initial w-full ml-4">               
            <div className="">                  
              <div className="bg-white my-4 flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <form className='w-full px-4 py-4' onSubmit={submit}>
                  <small className='mr-14'>Name</small>   
                  <small className={data.name.length <= 40 ? 'text-green-800' : 'text-red-800'}>
                    {data.name.length}/40
                  </small>             
                  <input type="text"  
                    className="create-post-input mb-4 w-1/2" 
                    onChange={e => setData('name', e.target.value)}
                    value={data.name}
                    maxLength={40}
                    required
                  />
                  {errors.name && <div className='text-sm text-red-800 mb-4'>{errors.name}</div>}
                  
                  <small className='mr-10'>Headline</small>     
                  {
                    newHeadline === null ?
                      <small className='text-green-800'>0/60</small> :
                      <small className={newHeadline.length <= 60 ? 'text-green-800' : 'text-red-800'}>
                      {newHeadline.length}/60
                    </small>    
                  }
                                 
                  <input type="text"  
                    className="create-post-input mb-4 w-1/2" 
                    onChange={e => setNewHeadline(e.target.value)}
                    value={newHeadline === null ? '' : newHeadline}
                    maxLength={60}
                  />                  
                  {errors.headline && <div className='text-sm text-red-800 mb-4'>{errors.headline}</div>}

                  <small className='mr-5'>Description</small>   
                  {
                    newDescription === null ?
                      <small className='text-green-800'>0/500</small> :
                      <small className={newDescription.length <= 500 ? 'text-green-800' : 'text-red-800'}>
                      {newDescription.length}/500
                    </small>    
                  }               
                  <textarea                     
                    className="create-post-input mb-4 w-2/3 h-24 p-4"
                    maxLength={500}
                    onChange={e => setNewDescription(e.target.value)}
                    value={newDescription === null ? '' : newDescription}
                  ></textarea>
                    {errors.description && <div className='text-sm text-red-800 mb-4'>{errors.description}</div>}   

                  <div className='w-2/3 h-0 border border-slate-400 my-2 mt-4'></div>
                  <h4 className='font-bold my-2'>Links:</h4>

                  <small>Website</small>            
                  <input type="text"  
                    placeholder='https://...'
                    className="create-post-input mb-4 w-2/3" 
                    onChange={e => setData('website', e.target.value)}
                    value={data.website === null ? '' : data.website}
                  />
                  {errors.website && <div className='text-sm text-red-800 mb-4'>{errors.website}</div>}

                  <small>Twitter</small>            
                  <input type="text"  
                    placeholder='https://www.twitter.com/...'
                    className="create-post-input mb-4 w-2/3" 
                    onChange={e => setData('twitter', e.target.value)}
                    value={data.twitter === null ? '' : data.twitter}
                  />
                  {errors.twitter && <div className='text-sm text-red-800 mb-4'>{errors.twitter}</div>}

                  <small>Fasebook</small>            
                  <input type="text"  
                    placeholder='https://www.facebook.com/...'
                    className="create-post-input mb-4 w-2/3" 
                    onChange={e => setData('facebook', e.target.value)}
                    value={data.facebook === null ? '' : data.facebook}
                  />
                  {errors.facebook && <div className='text-sm text-red-800 mb-4'>{errors.facebook}</div>}

                  <small>Instagram</small>            
                  <input type="text"  
                    placeholder='https://www.instagram.com/...'
                    className="create-post-input mb-4 w-2/3" 
                    onChange={e => setData('instagram', e.target.value)}
                    value={data.instagram === null ? '' : data.instagram}
                  />
                  {errors.instagram && <div className='text-sm text-red-800 mb-4'>{errors.instagram}</div>}

                  <small>Youtube</small>            
                  <input type="text"  
                    placeholder='https://www.youtube.com/...'
                    className="create-post-input mb-4 w-2/3" 
                    onChange={e => setData('youtube', e.target.value)}
                    value={data.youtube === null ? '' : data.youtube}
                  />
                  {errors.youtube && <div className='text-sm text-red-800 mb-4'>{errors.youtube}</div>}

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

export default EditProfile;