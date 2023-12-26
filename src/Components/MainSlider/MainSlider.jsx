import React from 'react';
import Slider from "react-slick";
import slider1 from '../../Assets/images/slider-image-1.jpeg';
import slider2 from '../../Assets/images/slider-image-2.jpeg';
import slider3 from '../../Assets/images/slider-image-3.jpeg';
import blog from '../../Assets/images/blog-img-1.jpeg';
import blog2 from '../../Assets/images/blog-img-2.jpeg';


export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
  return<>

  <div className="row gx-0">
    <div className="col-md-9">
    <Slider {...settings}>
      <img height={400} className='w-100' src={slider1} alt="slider1 " />
      <img height={400} className='w-100' src={slider2} alt="slider2 " />
      <img height={400} className='w-100' src={slider3} alt="slider3 " />
    </Slider>
    </div>
    <div className="col-md-3">
    <img height={200} className='w-100' src={blog} alt="blog " />
    <img height={200} className='w-100' src={blog2} alt="blog2 " />
    </div>
  </div>
    
  </>
}
