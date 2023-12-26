import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'
import CategoeySlider from '../CategoeySlider/CategoeySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'


export default function Home() {

    return <>
            <Helmet>
                <title>Fresh Cart</title>
             
            </Helmet>
        <MainSlider />
        <CategoeySlider />
        <FeaturedProduct />

    </>
}
