import React from 'react';

const CookieModal = () => {
  return (
    <div className='bg-slate-900/75 text-white rounded-lg fixed bottom-0 right-0 z-50 w-full h-30 md:w-1/2'>
      <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed">
              We use cookies to improve your experience on our site.
              To find out more, read our updated privacy policy and cookie policy.
          </p>        
      </div>
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
          <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
      </div>
    </div>
  )
}

export default CookieModal;