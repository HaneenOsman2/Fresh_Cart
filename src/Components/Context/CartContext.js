import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {

    let userToken = localStorage.getItem('userToken');
    let headers = {
        token: userToken
    }
    
    function addToCart(Id) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                productId: Id
            },
            {
                headers: headers
            }).then((response)=>response).catch((error)=>error)

    }

    function getLoggedUserCart(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      {headers:headers})
      .then((response)=>response).catch((err)=>err)
    }

    function removeCartItem(productId){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}).then((response)=>response).catch((err)=>err)
    }

    function updateProduct(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{headers}).then((response)=>response).catch((err)=>err)
    }

    return <CartContext.Provider value={{ addToCart , getLoggedUserCart , removeCartItem , updateProduct }}>
        {props.children}
    </CartContext.Provider>
}