import React from "react";

const SelectRowPerPage = ({pageSize, setPageSize}) => {
  return (
    <select 
      className="bg-gray-50 border mr-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2 mt-3 mx-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={pageSize}
      onChange={e => setPageSize(Number(e.target.value))}
    >
      {
        [10,25,50].map(pageSize => (
          <option key={pageSize} value={pageSize}>Show {pageSize}</option>
        ))
      }
    </select>
  )
}

export default SelectRowPerPage;