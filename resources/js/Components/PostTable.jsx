import React, { useMemo } from "react";
import { useTable } from "react-table";

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
  },
  {
    Header: 'Options',   
  },
]

export default function PostTable ({posts}) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => posts, []);

  const table = useTable({
    columns,
    data
  });

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = table;

  return (
    <div className="flex flex-col">
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
                          <th {...column.getHeaderProps()} 
                            scope="col" 
                            className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                          >
                            {column.render('Header')}
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