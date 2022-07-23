import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import GlobalFilter from "./GlobalFilter";
import SortAsc from "../icons/SortAsc";
import SortDesc from "../icons/SortDesc";
import { format } from "date-fns";
import ColumnFilter from "./ColumnFilter";
import PreviousArrow from "../icons/PreviousArrow";
import NextArrow from "../icons/NextArrow";
import DoubleRight from "../icons/DoubleRight";
import DoubleLeft from "../icons/DoubleLeft";

const COLUMNS = [
  {
    Header: 'Preview',   
    accessor: 'preview',
    Cell: tableProps => (
      <img src={tableProps.row.original.preview} alt="preview"/>
    ),   
    disableFilters: true
  },
  {
    Header: 'Title',    
    accessor: 'title',   
  },
  {
    Header: 'Category',   
    accessor: 'category',   
  },
  {
    Header: 'Tags',   
    accessor: 'tags',    
  },  
  {
    Header: 'Created at',   
    accessor: 'created_at',
    Cell: ({value}) => { return format(new Date(value), 'dd/MM/yyyy')},   
  },
  {
    Header: 'Options',       
    disableFilters: true
  },
]

export default function PostTable ({posts}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, []);

  const defaultColumn = useMemo(() => ({
    Filter: ColumnFilter
  }), []);

  const {getTableProps, getTableBodyProps, headerGroups, 
    page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize,
    prepareRow, state, setGlobalFilter} = useTable({
    columns,
    data,
    defaultColumn
  }, 
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination
  );

  const {globalFilter, pageIndex, pageSize} = state;

  return (
    <div className="flex flex-col">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>      
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">     
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">        
          <div className="overflow-hidden">          
            <table {...getTableProps()} className="min-w-full">
              <thead className="border-b">
                {
                  headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {
                        headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())} 
                            scope="col" 
                            className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                          >
                            <div className="w-full flex flex-row align-middle">
                              {column.render('Header')}                              
                              <span>
                                {column.isSorted ? (column.isSortedDesc ? <SortAsc/> : <SortDesc/>) : ''}
                              </span>
                            </div>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>                                                                
                          </th>
                        ))
                      }                     
                    </tr>
                  ))
                }
                </thead>              
              <tbody {...getTableBodyProps()}>
                {
                  page.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} className="border-b">
                        {
                          row.cells.map(cell => {
                            return <td 
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                              >
                                {cell.render('Cell')}
                              </td>
                          })
                        }
                      </tr>
                    )
                  })
                }             
              </tbody>             
            </table>
            <div className="flex items-center justify-center">
              <select 
                  className="bg-gray-50 border mr-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/6 p-2 mt-3 mx-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}
                >
                  {
                    [10,25,50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))
                  }
              </select>
              <span className="mt-3">
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <span className="ml-2">
                | Go to page: {' '}
                <input 
                  className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-12 p-2 mt-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number" defaultValue={pageIndex + 1}
                  onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>              
              <button 
                onClick={() => gotoPage(0)} 
                disabled={!canPreviousPage}
                type="button"
                className={canPreviousPage ? 'page-icon' : 'page-icon-disabled'}
              >
                <DoubleLeft/>
              </button>
              <button 
                type="button"
                className={canPreviousPage ? 'page-icon' : 'page-icon-disabled'}
                onClick={() => previousPage()} 
                disabled={!canPreviousPage}
              >
                <PreviousArrow/>
              </button>
              <button 
                type="button"
                className={canNextPage ? 'page-icon' : 'page-icon-disabled'}
                onClick={() => nextPage()} 
                disabled={!canNextPage}
                >
                  <NextArrow/>
              </button>
              <button 
                type="button"
                className={canNextPage ? 'page-icon' : 'page-icon-disabled'}
                onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
              >
                <DoubleRight/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}