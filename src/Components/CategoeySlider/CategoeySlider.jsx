import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import Slider from "react-slick";


export default function CategoeySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };

  
  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { isLoading, isError, data } = useQuery('categorySlider', getCategory);
  // console.log(data?.data.data);

  return <>
    {data?.data.data ? 
    <div className='py-4'>
 <Slider {...settings}>

{data?.data.data.map((category) => <img  src={category.image} className='w-100' key={category._id} height={200} />)}

</Slider>
    </div>
   

      : ' '}
  </>
}
