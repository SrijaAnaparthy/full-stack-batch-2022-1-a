import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Forgotpassword()
{
     const formik = useFormik({
        initialValues:
        {
          email: '',    
        },

        validationSchema: Yup.object
        ({
          email: Yup.string()
            .required('Email Required')
            .email("Email Must be a Valid one")
            .max(100),
        }),

        onSubmit: submitdata,

        });

      function submitdata(values)
      {
          console.log(values)   
          fetch('http://localhost:1000/usertest',{
            method:"POST",
            body:JSON.stringify(values),
            headers:
            {
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if(data.message==="success")
            {
                window.localStorage.setItem("resetpswdmail",data.email) 
                window.location='./resetpswd'
            }
            else{
                alert(data.message)
            }
        })
      }

    return(<div>
        <div>
            <h3>Forgot Password</h3><br/>

            <form onSubmit={formik.handleSubmit}>
            <label>
            Enter your mail here...
            </label>

            <input id="email" type='text'
               {...formik.getFieldProps('email')}
                ></input>

             {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}

          <br/>
          <button type="submit">Continue</button>
          </form>
          </div>
    </div>
)}