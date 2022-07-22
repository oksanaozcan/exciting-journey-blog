import React from "react";

export default function ColumnFilter ({column}) {
  const {filterValue, setFilter} = column;
  return (
    <span className="w-full">
      {' '}
      <input 
        className="block p-2 pl-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Search"
        value={filterValue || ''} 
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}