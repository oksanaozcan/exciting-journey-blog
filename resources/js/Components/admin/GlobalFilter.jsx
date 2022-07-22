import 'regenerator-runtime/runtime';
import React, {useState} from "react";
import { useAsyncDebounce } from "react-table";

export default function GlobalFilter ({filter, setFilter}) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 800)

  return (
    <span className="mx-4 my-4 w-96">
      {' '}
      <input 
        className="block p-2 pl-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Search..."
        value={value || ''} 
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  )
}

