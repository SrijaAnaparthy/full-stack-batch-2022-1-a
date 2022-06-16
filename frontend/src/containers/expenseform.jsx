import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import { getfriends } from "../actions/actions"
import {addexpense} from "../actions/actions"
import {connect} from 'react-redux'


function Expenseform(props)
{   
  const dispatch=useDispatch()

  React.useEffect(()=>{
    dispatch(getfriends());
  },[dispatch])    

   var [members,setmembers] = useState([])

   const users = props.users;
  // console.log("users",users)

   const mydata = users.friends;
  // console.log(mydata,"mudata");


    const formik = useFormik({
        initialValues: 
        {
          description : '',
          amount:null,
        },

        validationSchema: Yup.object({
          description: Yup.string()
            .required('Please Write some description')
            .max(100),
        amount:Yup.number()
           .required("Amount Required")
           .positive("Enter positive integer"),       
        }),

        onSubmit: submitdata,

      });


      function submitdata(values)
      {
              values={...values,members:members}
              dispatch(addexpense(values))
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
        <div>
         
            <div className='m-5 card p-3  mx-auto sh ' style={{ width: '400px' }}>
            <h3>Expense Form</h3><br/>

            <form className="form" onSubmit={formik.handleSubmit}>

            <label className="form-label">
               Expense Note
              </label>

            <input className="form-control" id="description" type='text'
               {...formik.getFieldProps('description')}
                ></input>
             {formik.touched.description&& formik.errors.description ? (
          <div style={{ color: 'red' }}>{formik.errors.description}</div>
        ) : null}
          <br/>

          <label className="form-label">
               Amount
              </label>
            <input className="form-control" id="amount" type='number'
               {...formik.getFieldProps('amount')}
                ></input>

             {formik.touched.amount&& formik.errors.amount? (
          <div style={{ color: 'red' }}>{formik.errors.amount}</div>
        ) : null}
          <br/>
          <label className="form-label">
              Choose Your Friends
              </label>
              <div className='d-flex'>
              {  mydata && mydata.map((data)=>{
              //  console.log(data,"mydata data ")
                  return(
                    <div className=' m-2'>
                    <input  className="form-check-input" onChange={handlecheckbox} type="checkbox" name={data.firstname} value={data.id}/>&nbsp;&nbsp;
                    <label className="form-label">{data.firstname}</label>
                    </div>
                  ) 
              })}
              </div>

          <button className="btn btn-primary mt-3" type="submit">
          Add Expense
        </button>
          </form>
          </div> 
        </div>
    )
}

export default connect((store) => store)(Expenseform)