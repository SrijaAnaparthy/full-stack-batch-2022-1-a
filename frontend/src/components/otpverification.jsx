import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link,useNavigate} from 'react-router-dom'
export default function Otppage()
{
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
          otp: '',
        },
        validationSchema: Yup.object({
          otp:Yup.string()
          .required('OTP Required')
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(6, 'Must be exactly 6 digits')
          .max(6, 'Must be exactly 6 digits')
            
            
        }),
        onSubmit: sendotp,
      });
      function sendotp(values)
      {
        values.email=window.localStorage.getItem('otpemail')
        values.password=window.localStorage.getItem('otppassword')
        console.log("valuessss",values)
        fetch('http://localhost:1000/otpverification',{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json()).then((data)=>{
            
            if(data.token)
            { 
              window.localStorage.setItem("token",data.token);
              window.localStorage.setItem("loginuser",data.email);
              window.localStorage.setItem("userid",data.id);
              window.localStorage.setItem("username",data.username);
              navigate('/home');
              window.location.reload ()
            }
            else if(data.errors)
            {
              alert("Invalied Details")
            }
            else
            {
                alert("Invalid OTP")
            }
        })
      }
    return(
        <div className='m-5 card p-5  mx-auto' style={{ width: '500px',height:'300px' }}>
               <h3>OTP Authentiction</h3><br/>
               <form className="form" onSubmit={formik.handleSubmit}>
               <label className="form-label" htmlFor="otp">
              Enter OTP
            </label>
            <input class="form-control" id="otp" type='text'  placeholder='Enter digits only' 
               {...formik.getFieldProps('otp')}
                ></input>
                 
        {formik.touched.otp && formik.errors.otp ? (
          <div style={{ color: 'red' }}>{formik.errors.otp}</div>
        ) : null}
          <br/>
          <button type='submit' className="btn btn-primary">Verify OTP</button><br/>
          </form>
        </div>
    )
}