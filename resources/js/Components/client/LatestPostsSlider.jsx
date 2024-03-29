import React, {useMemo} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeeAllLink from "../ui/SeeAllLink";
import Htag from "../Htag/Htag";
import { useContext } from "react";
import { LangContext } from "../../Context/LangContext";

export default function LatestPostsSlider (props) {
  const {lang} = useContext(LangContext);
  const latestPosts = useMemo(() => props.latestPosts, []); 

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (   
    <Slider {...settings}>
      {
        latestPosts.map(item => (
          <div key={item.id} className='relative container flex flex-col max-w-6xl mx-auto mt-10 mb-32 px-6 text-gray-900 md:flex-row md:px-0'>
            <img className='contrast-75' src={item.preview} alt="" />
            <div className="top-40 pr-0 bg-white md:absolute md:right-0 md:py-10 md:pl-20">
              <Htag tag="h3" classes="max-w-lg mt-10 mb-6 font-sans text-4xl text-center text-gray-900 uppercase md:text-5xl md:mt-0 md:text-left">{item.title}</Htag>              
              <h5 className="italic mb-2 text-right pr-10 text-blue-700">Post published: {item.for_human_date}</h5>              
              <div className="pr-10 mb-3">
                <p className='max-w-md text-center md:text-left'>{item.description}</p>
              </div>                  
              <SeeAllLink classes={'w-full md:w-2/4'} route={`/posts/${item.id}`} title={lang.get('welcomepage.read_more')}/> 
            </div>
          </div>
        ))
      }      
    </Slider>    
  );
}