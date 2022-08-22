import { v4 as uuidv4 } from 'uuid';

const tabsData = [
  {
    id: uuidv4(),
    title: 'My Activity', 
    active: true,
    opened: true,  
  },
  {
    id: uuidv4(),
    title: 'Profile',   
    active: false,
    opened: true,   
  },  
  {
    id: uuidv4(),
    title: 'Moderator',  
    active: false,
    opened: false,
  },
  {
    id: uuidv4(),
    title: 'Editor',   
    active: false,
    opened: false,
  },
  {
    id: uuidv4(),
    title: 'Writer',    
    active: false,
    opened: false,
  }, 
]

export default tabsData;