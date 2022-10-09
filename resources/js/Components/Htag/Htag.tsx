import React from "react";
import { HtagProps } from "./Htag.props";

const Htag = ({tag, classes, children}: HtagProps): JSX.Element => {
  switch (tag) {
    case 'h1': return <h1 className={classes ? classes : 'text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'}>{children}</h1>;
    case 'h2': return <h2 className={classes ? classes : 'text-4xl text-center uppercase md:text-left md:text-5xl'}>{children}</h2>;
    case 'h3': return <h3 className={classes ? classes : 'text-4xl text-center uppercase mb-4 md:text-left md:text-5xl'}>{children}</h3>;
    case 'h4': return <h4 className={classes}>{children}</h4>;
    case 'h5': return <h5 className={classes ? classes : 'absolute font-bold px-6 duration-200 w-52 bottom-4 md:bottom-8 md:px-10 group:hover:scale-110 group-hover:text-black'}>{children}</h5>;
    case 'h6': return <h6 className={classes ? classes : 'text-lg w-full mr-2 font-bold text-sky-900 md:text-2xl'}>{children}</h6>;
    default: return <></>;
  }
}

export default Htag;