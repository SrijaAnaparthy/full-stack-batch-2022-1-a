import React,{useEffect,useState} from "react";
import {useDispatch} from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux'

import { creategroup, getfriends} from "../actions/actions"


function Groups(props)
{   

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getfriends())
     },[dispatch])
    
     const users = props.users;
     const mydata = users.friends;
     console.log(mydata,"griends list");


     var [members,setmembers] = useState([])

     const formik = useFormik({
        initialValues: 
        {
          grpname : '',
        },

        validationSchema: Yup.object({
          grpname: Yup.string()
            .required('Please Name your group')
            .max(100),     
        }),

        onSubmit: submitdata,

      });

      function submitdata(values)
      {
              values={...values,members:members}
              console.log(values,"values");
              dispatch(creategroup(values))
      }

      function handlecheckbox(e)
      {        
              if(e.target.checked)
              {   
                 members.push(e.target.value)
              //   console.log("mem",members)
                 setmembers([...members])
              }
              else
              {
               var index=members.indexOf(e.target.value)
               members.splice(index,1)  
           //    console.log("mem",members)   
               setmembers([...members])
              }
      }



   return(
    <div className='m-5 card p-3  mx-auto sh ' style={{ width: '400px' }}>
<h3>Create Group</h3><br/><br/>
<form className="form" onSubmit={formik.handleSubmit}>

<label className="form-label">
   Group Name
  </label>

<input className="form-control" id="grpname" type='text'
   {...formik.getFieldProps('grpname')}
    ></input>
 {formik.touched.grpname&& formik.errors.grpname ? (
<div style={{ color: 'red' }}>{formik.errors.grpname}</div>
) : null}
<br/>

<label className="form-label">
  Pick Your Friends
  </label>
  <div className='d-flex'>
  {  mydata && mydata.map((data)=>{
      return(
        <div className=' m-2'>
        <input  className="form-check-input" onChange={handlecheckbox} type="checkbox" name={data.firstname} value={data.id}/>&nbsp;&nbsp;
        <label className="form-label">{data.firstname}</label>
        </div>
      ) 
  })}
  </div>

<button className="btn btn-primary mt-3" type="submit">
Create Group
</button>
</form>
    </div>
   )
}

export default connect((store) => store)(Groups)





         




