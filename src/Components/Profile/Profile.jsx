import React, { useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../Context/UserContext';


export default function Profile() {
    let {userData}=useContext(UserContext);
    useEffect(()=>{
        let encoded=localStorage.getItem('userToken');
        let decoded=jwtDecode(encoded);

    },[])

  return <>
  <h2 className='text-main text-center'>Welcome : {userData?.name}</h2>
  {/* <h2>{userData?.email}</h2> */}

  </>
}
