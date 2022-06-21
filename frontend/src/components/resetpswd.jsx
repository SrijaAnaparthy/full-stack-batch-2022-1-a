import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Resetpassword()
{
  const BE_HOST= "https://breakthepriceapp-backend.herokuapp.com"
    const formik = useFormik({
        initialValues: {
          password:'',
          confirmpassword: '', 
        },
    
        validationSchema: Yup.object({
         
          confirmpassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

           password:Yup.string()
           .min(2,'*Please enter long length password')
           .max(12,"*must be > than 8 characters")
           .required('*password required')
        }),

        onSubmit: submitdata,

      });

      function submitdata(values)
      {      
            var email=window.localStorage.getItem("resetpswdmail")
            
            var obj = {
              email:email,
              password:values.password
            }

              fetch(`${BE_HOST}/resetpassword`,{
                method:"POST",
                body:JSON.stringify(obj),
                headers:{
                    'Content-Type':'application/json'
                }
              })
              .then(res=>res.json()).then(data=>{
                  console.log(data)
                  if(data.message === "success")
                  {
                       alert("Password reset Successful")
                       window.location='./login'
                  }
                  else
                  {
                      alert(data.message)    
                  }
              })
      }
       
    return(
        <div>
            <div className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>

            <h3>Reset Password</h3><br/>

            <form onSubmit={formik.handleSubmit}>
            <label className="form-label">
            Enter Your New password
            </label>

            <input id="password" type='password' className="form-control"
               {...formik.getFieldProps('password')}
            ></input>

             {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
          <br/>

          <label className='form-label'>
          Confirm password
        </label>
        
            <input id="confirmpassword" type='password' className="form-control"
               {...formik.getFieldProps('confirmpassword')}
                ></input>

             {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmpassword}</div>
        ) : null}
          <br/>

          <button type="submit" className="btn btn-primary mt-3" style={{marginLeft:'150px',padding:'10px',fontSize:'25px',width:'150px'}}>Reset</button>

          </form>
          </div>
        </div>
)}