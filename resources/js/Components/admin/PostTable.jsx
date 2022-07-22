import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import GlobalFilter from "./GlobalFilter";
import SortAsc from "../icons/SortAsc";
import SortDesc from "../icons/SortDesc";
import { format } from "date-fns";

const COLUMNS = [
  {
    Header: 'Preview',   
    accessor: 'preview',
    Cell: tableProps => (
      <img src={tableProps.row.original.preview} alt="preview"/>
    )
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
    Cell: ({value}) => { return format(new Date(value), 'dd/MM/yyyy')}
  },
  {
    Header: 'Options',   
  },
]

export default function PostTable ({posts}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = useTable({
    columns,
    data
  }, 
  useGlobalFilter,
  useSortBy
  );

  const {globalFilter} = state;

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
                            
                          </th>
                        ))
                      }                     
                    </tr>
                  ))
                }
                </thead>              
              <tbody {...getTableBodyProps()}>
                {
                  rows.map(row => {
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
          </div>
        </div>
      </div>
    </div>
  );
}