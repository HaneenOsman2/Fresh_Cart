// import React from 'react'
// import axios from 'axios'
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
//   const validation = Yup.object({

//     email: Yup.string().required("Email is requird").email("Please enter the cailed email"),
//     password: Yup.string().required("Password is requird").matches(/^[A-Z]/, "Password must start with upperCase letter").
//       min(8, "Password must be at leat 8 character").max(25, "Password must be at most 25 character"),
//   })
//   let formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },

//     validationSchema: validation,

//     onSubmit: function (x) {
//       login(x);
//     },
//   })

//   async function login(values) {
//     const options = {
//       url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
//       method: "post",
//       data: values,
//     };

//     let { data } = await axios.request(options);
//     if (data.message == "success") {
//       localStorage.setItem('uerToken',data.token)
//       navigate("/");
//     }
//   }


//   return <>
//     <div className="container py-5">
//       <form onSubmit={formik.handleSubmit}>

//         <div className="email">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input type="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//           {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger p-2 mt-2">
//             {formik.errors.email}
//           </div>) : ("")
//           }
//         </div>


//         <div className="password w-100">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.errors.password && formik.touched.password ? (<div className="alert alert-danger p-2 mt-2">
//             {formik.errors.password}
//           </div>) : ("")
//           }
//         </div>


//         <button type='submit' className='btn btn-primary w-100 rounded-pill mt-3'>Login </button>
//         <button className='btn btn-success w-100 rounded-pill mt-3' onClick={formik.handleReset}>Clear</button>

//       </form>
//     </div>
//   </>
// }

import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { Grid } from 'react-loader-spinner'
import { UserContext } from '../Context/UserContext';

export default function Login() {
  let {setUserToken , setUserData} =useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const validation = Yup.object({
    email: Yup.string().required("Email is requird").email("Please enter the cailed email"),
    password: Yup.string().required("Password is requird").matches(/^[A-Z]/, "Password must start with upperCase letter").min(8, "Password must be at leat 8 character").max(25, "Password must be at most 25 character"),
  })

  let formik = useFormik({ 
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,

    onSubmit: function (x) {
      signIn(x);
    },
  })

  async function signIn(values) {
    setisLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
        setisLoading(false);
        setError(err.response.data.message)
      })

    if (data.message === "success") {
      setisLoading(false);
      localStorage.setItem('userToken',data.token);
      setUserToken(data.token);
      setUserData(data.user);
      navigate("/");

    }
  }

  return <>
    <div className="container py-5">
      {error !== null ? <div className='alert alert-danger'>{error}</div> : ''}

      <h3>Login Now : </h3>
      <form onSubmit={formik.handleSubmit}>

        <div className="email">
          <label htmlFor="email" className="form-label">Email : </label>
          <input type="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger p-2 mt-2">
            {formik.errors.email}
          </div>) : ("")
          }
        </div>

        <div className="password ">
          <label htmlFor="password" className="form-label">Password : </label>
          <input type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (<div className="alert alert-danger p-2 mt-2">
            {formik.errors.password}
          </div>) : ("")
          }
        </div>



        {isLoading ? <button type='button' className='btn bg-main text-white  rounded mt-3'>
          <Grid
            height="20"
            width="80"
            color="#fff"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </button> :
          <>
            <div className='d-flex align-items-center'>

              <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white  rounded mt-3 mx-2'>Login</button>

              <Link className='btn' to={'/register'}>Register Now</Link>

              </div>

              </>
      
        }



            </form>
          </div>
      </>
}
