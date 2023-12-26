import React, { useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { Circles } from  'react-loader-spinner'

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const validation = Yup.object({
    name: Yup.string().required("Name is requird").min(3, "Name must be 3 characters").max(8, "Name must be at most 8   character"),
    email: Yup.string().required("Email is requird").email("Please enter the cailed email"),
    password: Yup.string().required("Password is requird").matches(/^[A-Z]/, "Password must start with upperCase letter").min(8, "Password must be at leat 8 character").max(25, "Password must be at most 25 character"),
    rePassword: Yup.string().required("rePassword is requird").oneOf([Yup.ref("password")], "Password must Match"),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}/, "Please Enter an Egyption phone number "),

  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',

    },
    validationSchema: validation,

    onSubmit: function (x) {
      signUp(x);
    },
  })

  async function signUp(values) {
    setisLoading(true);
    // console.log(values);
    // const options = {
    //   url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
    //   method: "post",
    //   data: values,
    // };

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false);
        setError(err.response.data.message)
      })

    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");


      // let { data } = await axios.request(options);
      // if (data.message === "success") {
      //   navigate("/login");

      // }
    }
  }

  return <>
    <div className="container py-5">
      {error !== null ? <div className='alert alert-danger'>{error}</div> : ''}

      <h3>Register Now : </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="name">
          <label htmlFor="name" className="form-label">Name : </label>
          <input type="text" id="name" className="form-control" value={formik.values.name} onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>) :
            ("")
          }
        </div>

        <div className="email">
          <label htmlFor="email" className="form-label">Email : </label>
          <input type="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email ? (<div className="alert alert-danger p-2 mt-2">
            {formik.errors.email}
          </div>) : ("")
          }
        </div>

        <div className='d-flex gap-2 mt-2'>
          <div className="password w-100">
            <label htmlFor="password" className="form-label">Password : </label>
            <input type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (<div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>) : ("")
            }
          </div>

          <div className="rePassword w-100">
            <label htmlFor="rePassword" className="form-label">rePassword : </label>
            <input type="password" id="rePassword" className="form-control" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            {formik.errors.rePassword && formik.touched.rePassword ? (<div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>) : ("")
            }
          </div>

        </div>

        <div className="phone">
          <label htmlFor="phone" className="form-label">Phone : </label>
          <input type="tel" id="phone" className="form-control" value={formik.values.phone} onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.phone && formik.touched.phone ? (<div className="alert alert-danger p-2 mt-2">
            {formik.errors.phone}
          </div>) : ("")
          }
        </div>


        {isLoading ? <button type='button' className='btn bg-main text-white  rounded mt-3'>
 <Circles
 height="20"
 width="80"
 color="white"
 ariaLabel="circles-loading"
 wrapperStyle={{}}
 wrapperClass=""
 visible={true}
/>
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white  rounded mt-3'>Register</button>
        }


        {/* <button className='btn btn-success w-100 rounded-pill mt-3' onClick={formik.handleReset}>Clear</button> */}

      </form>
    </div>
  </>
}
