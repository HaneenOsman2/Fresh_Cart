import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';


export default function ProductDetails() {
    let params = useParams();
    // console.log(params.id);
    //     const [prductDetails, setprductDetails] = useState(null);

    //    async function getProductDetails(id){
    //     let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    //     setprductDetails(data);
    //     }

    //     useEffect(()=>{
    //         getProductDetails(params.id);
    //     })

    function getProductDetails(id) {
        return axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    let { isLoading, isError, data } = useQuery('ProductDetails', () => getProductDetails(params.id));
    console.log(data?.data.data);



    return <>
        {data?.data.data ? <div className='row py-2 align-items-center'>
            <Helmet>
                <title>{data?.data.data.title}</title>

            </Helmet>
            <div className='col-md-4'>
                <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />

            </div>
            <div className='col-md-8'>
                <h2 className='h5'>{data?.data.data.title}</h2>
                <p className='text-muted py-2'>{data?.data.data.description}</p>

                <h6>{data?.data.data.category?.name}</h6>


                <div className='d-flex justify-content-between'>
                    <h6>{data?.data.data.price}EGP</h6>
                    <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
                </div>

                <button className='btn bg-main w-100 mt-2 text-white'>Add to cart</button>
            </div>
        </div> : ''}

    </>
}
