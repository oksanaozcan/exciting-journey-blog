import React from "react";
import { useContext } from "react";
import { LangContext } from "../../Context/LangContext";

export default function SeeAllLink ({classes, route, title}) {
  const {lang} = useContext(LangContext);
  return (
    <a
      href={route}
      type='button'
      className={`btn text-center ${classes}`}>
        {
          title ?
          title :
          lang.get('welcomepage.see_all')
        }        
    </a>
  )
}