import React, { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home';
import Product from './Components/Product/Product';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import  { UserContext } from './Components/Context/UserContext';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile';





export default function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'product', element: <ProtectedRoute><Product /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ])

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  })
  return <CartContextProvider>

    <RouterProvider router={routes}></RouterProvider>
    <Toaster/>
  </CartContextProvider>



}
