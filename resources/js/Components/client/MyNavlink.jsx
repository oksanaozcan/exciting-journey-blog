import React from "react";

export default function MyNavlink ({path, title, classes}) {
  const styles = classes ? 
  `${classes}` :
  'mx-2 group-hover:border-b group-hover:border-rose-600 ease-in duration-300';
  return (
    <div className="group">
      <a href={path}>{title}</a>
      <div className={styles}></div>
    </div>
  );
}