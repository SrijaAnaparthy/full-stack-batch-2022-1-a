import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link,useNavigate} from 'react-router-dom'

export default function Login()
{
  const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password:'', 
        },

        validationSchema: Yup.object({
          email: Yup.string()
            .required('*email Required')
            .email("Must be Valid email")
            .max(225),
        password:Yup.string()
           .required('*password required'), 
        }),
        onSubmit: submitdata,
      });


      function submitdata(values)
      {
        window.localStorage.setItem('otpemail',values.email)
        window.localStorage.setItem('otpcode',values.password)
        fetch('http://localhost:1000/login',{
            method:"POST",
            body:JSON.stringify(values),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json()).then((data)=>{
            console.log(data)
            if(data.errors)
            {
              alert("Invalid Details");
            }
            else if(data.message === 'success')
            {
              navigate('/otpverification')
            }
            // if(data.token)
            // { 
            //   window.localStorage.setItem("token",data.token);
            //   window.localStorage.setItem("loginuser",data.email);
            //   window.localStorage.setItem("userid",data.id);
            //   window.location='./home'
            // }
            else
            {
                alert(data.message)
            }
           
        })
      }
    
    return(
        <div>
        <div className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>
            <h3>LOGIN Page</h3><br/>
            <form onSubmit={formik.handleSubmit}>
            <label className="form-label">
          Email
        </label>
            <input id="email" type='text' className="form-control"  placeholder='Please Enter Your Email' 
               {...formik.getFieldProps('email')}
            ></input>
                 
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
          <br/>

          <label className="form-label">
          Password
        </label>

        <input type='password' className="form-control" id="password" {...formik.getFieldProps('password')} placeholder='Please Enter Your Password'></input><br/>
        
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
        
        <Link to={'/forgetpswd'}>Forgot Password ?</Link>
         <br/><br/>
            <button className="btn btn-primary mt-3" type='submit' style={{marginLeft:'150px',padding:'10px',fontSize:'25px',width:'150px'}}>Login</button><br/><br/>
           <div className='d-flex'> <p>Don't have Account?</p>&nbsp;&nbsp;&nbsp;<Link to={'/signup'}>SignUp here!!</Link></div>
           </form>
       </div>
        </div>
    )
}
