import axios from 'axios'
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'


export default function FeaturedProduct() {
    let { addToCart } = useContext(CartContext);

    async function addProductToCart(Id) {
        let response = await addToCart(Id);
        if (response.data.status === 'success') {
            toast.success('Product Successfully Added')
        }
        else {
            toast.error('Error , Try Agin')
        }
        
        console.log(response);
    }

    function getFeaturedProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let { isLoading, isError, data, isFetching } = useQuery('featuredProduct', getFeaturedProduct);
    // console.log(data);

    return <>
        {isLoading ? <div className='w-100 py-5 d-flex justify-content-center'>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div> : <div className="container">
            <h2>featured Product</h2>
            <div className="row">
                {data?.data.data.map((product) => <div key={product._id} className='col-md-2'>

                    <div className='product cursor-pointer py-3 px-2'>
                        <Link to={`/productdetails/${product.id}`}>
                            <img className='w-100' src={product.imageCover} alt={product.title} />
                            <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                            <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>

                            <div className='d-flex justify-content-between mt-3'>
                                <span>{product.price}EGP</span>
                                <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>

                            </div>
                        </Link>
                        <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>add to cart</button>
                    </div>

                </div>)}

            </div>
        </div>}



    </>
}
