import { format } from "date-fns";

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
    Header: 'Likes',    
    accessor: 'likes_count',   
  },
  {
    Header: 'Comments',    
    accessor: 'comments_count',   
  },
  {
    Header: 'Visits',    
    accessor: 'visits_count',   
  },
  {
    Header: 'Category',   
    accessor: 'category',   
  },
  {
    Header: 'Tags',   
    accessor: 'tags',          
    Cell: ({value}) => {      
      return value.join(', ');
    }    
  },  
  {
    Header: 'Created at',   
    accessor: 'created_at',
    Cell: ({value}) => { return format(new Date(value), 'dd/MM/yyyy')},   
  },
  {
    Header: 'Options',       
    disableFilters: true,
    Cell: tableProps => (
      <>
        <a href={`/admin/posts/${tableProps.row.original.id}/edit`} className="btn p-2 m-1">Edit</a>        
        <a href={`/admin/posts/${tableProps.row.original.id}`} className="btn p-2 m-1">Show</a>        
      </>
     
    )
  },
];

const ARTICLES = [
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
  // {
  //   Header: 'Likes',    
  //   accessor: 'likes_count',   
  // },
  {
    Header: 'Comments',    
    accessor: 'comments_count',   
  },
  {
    Header: 'Visits',    
    accessor: 'visits_count',   
  }, 
  {
    Header: 'Created at',   
    accessor: 'created_at',
    Cell: ({value}) => { return format(new Date(value), 'dd/MM/yyyy')},   
  },
  {
    Header: 'Options',       
    disableFilters: true,
    Cell: tableProps => (
      <>
        <a href={`/admin/posts/${tableProps.row.original.id}/edit`} className="btn p-2 m-1">Edit</a>        
        <a href={`/articles/${tableProps.row.original.id}`} className="btn p-2 m-1">Show</a>        
      </>     
    )
  },
];

const TRASHED_COLUMNS = [
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
    Cell: ({value}) => {      
      return value.join(', ');
    }    
  },  
  {
    Header: 'Deleted at',   
    accessor: 'deleted_at',
    Cell: ({value}) => { return format(new Date(value), 'dd/MM/yyyy')},   
  }, 
]

export {COLUMNS, TRASHED_COLUMNS, ARTICLES};