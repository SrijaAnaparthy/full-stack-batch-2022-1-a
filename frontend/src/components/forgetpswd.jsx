import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function Forgotpassword()
{
  const BE_HOST= "https://breakthepriceapp-backend.herokuapp.com"
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
          fetch(`${BE_HOST}/usertest`,{
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
        <div  className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>
            <h3>Forgot Password</h3><br/>

            <form onSubmit={formik.handleSubmit}>
            <label className="form-label">
            Enter your mail here...
            </label>

            <input id="email" type='text'
               {...formik.getFieldProps('email')}
               className="form-control" ></input>

             {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}

          <br/>
          <button type="submit" className="btn btn-primary mt-3" style={{marginLeft:'150px',padding:'10px',fontSize:'25px',width:'150px'}}>Continue</button>
          </form>
          </div>
    </div>
)}