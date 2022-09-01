import React, {useState, useEffect} from "react";
import { usePage } from '@inertiajs/inertia-react';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import SidebarDashboard from '@/Components/client/SidebarDashboard';
import { Inertia } from "@inertiajs/inertia";

const AccountSecurity = ({permissions, auth, admin}) => {
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  const { data, setData, post, progress, processing } = useForm({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',    
  });

  const { errors } = usePage().props;

  useEffect(() => {
    setData('current_password', curPass)
  }, [curPass, setCurPass])
  useEffect(() => {
    setData('new_password', newPass)
  }, [newPass, setNewPass])
  useEffect(() => {
    setData('new_password_confirmation', confirmNewPass)
  }, [confirmNewPass, setConfirmNewPass])

  const submit = (e) => {
    e.preventDefault()        
    post(`/dashboard/${auth.user.id}`, {
      preserveState: false,
      onSuccess: () => {
        Inertia.post(route('logout'));
        Inertia.get(route('login'));
      } 
    });
  }  

  return (
    <Authenticated
      auth={auth}
      errors={errors}
      admin={admin}
      header={<><h2 className="font-semibold text-xl text-gray-800 leading-tight">Account</h2><p>Edit your account settings and change your password here.</p></>}
    >
      <Head title="Account" />
        <div className="flex">                    
          <div className='flex-initial w-18'>
            <SidebarDashboard activeLink={'account-security'}/>
          </div>                 
          <div className="flex-initial w-full ml-4">               
            <div className="">                  
              <div className="bg-white my-4 flex flex-col items-center overflow-hidden shadow-sm sm:rounded-lg">
                <h4 className="font-bold py-4">Change Password: </h4>
                <form className='w-full px-4 py-4' onSubmit={submit}>
                  <small className='mr-14'>Enter Current Password</small>                              
                  <input 
                    type="password"  
                    className="create-post-input mb-4 w-1/2" 
                    onChange={e => setCurPass(e.target.value)}
                    value={curPass === null ? '' : curPass}
                    required
                  />
                  {errors.current_password && <div className='text-sm text-red-800 mb-4'>{errors.current_password}</div>}     

                  <small className='mr-14'>Enter New Password</small>                              
                  <input 
                    type="password"  
                    className="create-post-input mb-4 w-1/2" 
                    onChange={e => setNewPass(e.target.value)}
                    value={newPass === null ? '' : newPass}
                    minLength={8}
                    required
                  />
                  {errors.new_password && <div className='text-sm text-red-800 mb-4'>{errors.new_password}</div>}      

                  <small className='mr-14'>Confirm New Password</small>                              
                  <input 
                    type="password"  
                    className="create-post-input mb-4 w-1/2" 
                    onChange={e => setConfirmNewPass(e.target.value)}
                    value={confirmNewPass === null ? '' : confirmNewPass}
                    required
                  />
                  {errors.new_password_confirmation && <div className='text-sm text-red-800 mb-4'>{errors.new_password_confirmation}</div>}                     

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

export default AccountSecurity;