import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Context/CartContext'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Hearts } from 'react-loader-spinner'


export default function Cart() {
  let { getLoggedUserCart, removeCartItem , updateProduct } = useContext(CartContext);
  const [cartDetails, setcartDetails] = useState(null);

  async function removeCart(id) {
    let { data } = await removeCartItem(id);
    setcartDetails(data);
  }


  async function getCart() {
    let { data } = await getLoggedUserCart();
    setcartDetails(data);
  }

 async function updateCount(id ,count){
  let {data}=await  updateProduct(id,count);
  setcartDetails(data);
  }

  useEffect(() => {
    getCart();
  }, [])


  return <>
    {cartDetails ? <div className='w-75 mx-auto my-3 bg-main-light p-3'>
      <h3>Shop Cart:</h3>
      <h6 className=' text-main fw-bolder mb-3'>Total Price: {cartDetails.data.totalCartPrice} EGP</h6>
      {cartDetails.data.products.map((product) => <div key={product.product.id} className='row border-bottom py-2'>

        <div className="col-md-1">
          <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
        </div>

        <div className="col-md-11">
          <div className='d-flex justify-content-between align-items-center'>

            <div>
              <h3 className='h6'>{product.product.title.split(' ').slice(0, 3).join(' ')} </h3>
              <h6 className='text-main'>Price: {product.price} EGP</h6>
            </div>

            <div>
              <button onClick={()=>updateCount(product.product.id ,product.count + 1)} className='bord-main btn p-1'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={()=>updateCount(product.product.id ,product.count - 1)} className='bord-main btn p-1' >-</button>
            </div>

          </div>

          <button onClick={() => removeCart(product.product.id)} className='btn p-0 '><i className='font-sm text-main fas fa-trash-can'></i> Remove</button>
        </div>

      </div>)}

    </div> : <section id='loading' className='d-flex justify-content-center align-items-center '>
      <Hearts
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </section>}

  </>
}
