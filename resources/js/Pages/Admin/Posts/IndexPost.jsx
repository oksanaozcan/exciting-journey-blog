import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

export default function IndexPost(props) {
  const {test, posts} = props;

    return (
      <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}
      >
        <Head title="Posts" />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">{test}</div>
              <ul>
                {
                  posts.map(p => (
                    <li key={p.id}>{p.title} created at {p.created_at}</li>
                  ))
                }
              </ul>                    
            </div>
          </div>
        </div>            
      </Authenticated>
    );
}
