import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Resetpassword()
{
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

              fetch("http://localhost:1000/user/resetpassword",{
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
                       window.location='./'
                  }
                  else
                  {
                      alert(data.message)    
                  }
              })
      }
       
    return(
        <div>
            <div>

            <h3>Reset Password</h3><br/>

            <form onSubmit={formik.handleSubmit}>
            <label>
            Enter Your New password
            </label>

            <input id="password" type='password'
               {...formik.getFieldProps('password')}
            ></input>

             {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
          <br/>

          <label>
          Confirm password
        </label>
        
            <input id="confirmpassword" type='password'
               {...formik.getFieldProps('confirmpassword')}
                ></input>

             {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmpassword}</div>
        ) : null}
          <br/>

          <button type="submit">Reset</button>

          </form>
          </div>
        </div>
)}