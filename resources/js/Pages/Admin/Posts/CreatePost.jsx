import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Sidebar from '@/Layouts/Sidebar';

export default function CreatePost(props) {
  const {categories} = props;  
  console.log(categories);
    return (
      <Authenticated
        auth={props.auth}
        errors={props.errors}
        // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Posts</h2>}
      >        
        <div className="grid grid-cols-5 gap-1">          
          <div className="..."> 
            <Sidebar auth={props.auth}/>
          </div>
          <div className="col-span-4 ...">
          Create Post
          </div>
        </div>   
                   
      </Authenticated>
    );
}