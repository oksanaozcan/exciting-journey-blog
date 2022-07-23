import React from "react";

const NavPageBtn = ({onClick, disabled, classes, icon}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      type="button"
      className={classes}
    >
      {icon}
    </button>
  )
}

export default NavPageBtn;