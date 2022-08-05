import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SinglePostSlider ({pictures}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (         
    <Slider {...settings}>
      {
        pictures.map(picture => (
          <div className="h-96" key={picture.id}>
            <img className="object-cover h-full w-3/4 mx-auto" src={picture.path} />             
          </div>   
        ))
      }           
    </Slider>    
  )
}