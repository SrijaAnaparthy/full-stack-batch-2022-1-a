import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom'

export default function Signup()
{    //const [flag,setflag]=React.useState(0);

    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname:'',
          email: '',
          password:'',
          confirmpassword: '',
          phno : ''
          
        },
    
        validationSchema: Yup.object({
          firstname: Yup.string()
            .min(2, '*too short')
            .max(15, '*Must be 15 characters or less')
            .required('Fulltname Required'),
            lastname: Yup.string()
            .min(2, '*too short')
            .max(15, '*Must be 15 characters or less')
            .required('Fulltname Required'),
            email: Yup.string()
            .email('Must be valid email')
            .required('Email Required'),
            password:Yup.string()
            .min(2,'*too short')
            .max(8,"*must be 8 characters")
            .required('*password required'),
            confirmpassword: Yup.string()
            .required('confirm your password')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            phno: Yup.string()
              .required(),
        }),
        onSubmit: submitdata,
      });


     function submitdata(values)
     {

            console.log(values)

            const {firstname,lastname,email,password,phno} = values;

            console.log(firstname,lastname,email,password,phno);

            fetch('http://localhost:1000/signup',{
                method:"POST",
                body:JSON.stringify({firstname,lastname,email,password,phno}),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res)=>res.json()).then((data)=>{
                if(data.message==="success")
                {
                    alert("User created successfully")
                }
                else
                {
                    alert(data.err)
                }
            })

     }


    return(
        <div className="card m-5 p-5 mx-auto sh" style={{ width: '600px' }}>
        <h3>SignUp Page</h3><br/>
      <form onSubmit={formik.handleSubmit}>
        <label  className="form-label">
          First Name
        </label>
        <input
        className="form-control"
          id="firstname"
          type="text"
          {...formik.getFieldProps('firstname')}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div style={{ color: 'red' }}>{formik.errors.firstname}</div>
        ) : null}
         <br/>
         <label  className="form-label">
             Last Name
         </label>
         <input
         className="form-control"
          id="lastname"
          type="text"
          {...formik.getFieldProps('lastname')}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div style={{ color: 'red' }}>{formik.errors.lastname}</div>
        ) : null}
         <br/>
        <label  className="form-label">
          Email Address
        </label>
        <input
        className="form-control"
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
         <br/>

         <label className="form-label" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="form-control"
          id="phone"
          type="tel"
          {...formik.getFieldProps('phno')}
        />
        {formik.touched.phno && formik.errors.phno? (
          <div style={{ color: 'red' }}>{formik.errors.phno}</div>
        ) : null}
         <br/>

       <label  className="form-label">
          Password
        </label>
        <input
        className="form-control"
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
        <br/>
         <label  className="form-label">
          ConfirmPassword
        </label>
        <input
          className="form-control"
          id="confirmpassword"
          type="password"
          {...formik.getFieldProps('confirmpassword')}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <div style={{ color: 'red' }}>{formik.errors.confirmpassword}</div>
        ) : null}

        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button><br/>
        <div>
        <p>Already have account?</p>&nbsp;&nbsp;<Link to='/'>Login</Link>
        </div>
      </form>
    </div>
    )
}