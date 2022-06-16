import React,{useEffect,useRef,useState} from "react";
import {useDispatch} from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux'
import {Accordion, Button} from 'react-bootstrap'
import { addgrpexpense,groupdetails,getgrpmem} from "../actions/actions"


function GroupExpenseForm(props)
{   
    const dispatch=useDispatch()

    useEffect(()=>{
      dispatch(groupdetails());
    },[dispatch])    
  
    const users = props.users;
    //console.log(users,"userss");
    const mydata = users.data;
    const mem = users.grpmem;
   // console.log(mem,"grp members");

    //const navigate = useNavigate();

    var [members,setmembers] = useState([])
    var [id,setid] = useState();

    const ref = useRef();
  
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
                dispatch(addgrpexpense(values,id))
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
  
        function handlefunc(e)
        {
            // console.log(e,"event id");
            // console.log(e.target.value,"groupid");
            console.log(ref.current.value,"val");
            const grpid = e.target.value;
            setid(grpid);
            console.log(id,"iddddd");
            dispatch(getgrpmem(grpid))
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
                Select Group Name
                </label>
        {/* <div class="accordion" id="accordionExample">
        { 
        (mydata && mydata.map((data,i)=>
            {   

                return(
                   
                    <div class="accordion-item">
                      <h2 class="accordion-header" id={data.id}>
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target= {"#"+ data.grpname.replace(" " ," ")} aria-expanded="true" aria-controls={data.grpname.replace(" " ," ")} value={data.id} onClick={handlefunc}>
                          {data.grpname}
                        </button>
                      </h2>
                      <div id={data.grpname.replace(" "," ")} class="accordion-collapse collapse show" aria-labelledby={data.id} data-bs-parent="#accordionExample">
                        <div class="accordion-body" id={data.id}>
                          <label className="form-label">
                            Pick your friends
                          </label>
                          {
                            (mem && mem.map((members) =>
                            {
                                return(
                                    
                                <div className=' m-2'>
                                <input  className="form-check-input" onChange={handlecheckbox} type="checkbox" name={members.firstname} value={members.id}/>&nbsp;&nbsp;
                                <label className="form-label">{members.firstname}</label>
                                </div>
                                )
                            }))
                          }
                        </div>
                      </div>
                    </div>
                    
                )

            }))   
        }
        </div> */}

        {
        mydata && mydata.map((data,i) =>
        {
            return(
              <Accordion defaultActiveKey={['0']} flush>
                  <Accordion.Item eventKey={i}>
                  <Accordion.Header ref={ref}><Button style={{width : '450px',background : '#E7F1FF',color: '#212529'}} value={data.id} onClick={handlefunc} eventKey={i}>{data.grpname}</Button></Accordion.Header>
                     <Accordion.Body eventKey={i}>
                     <label className="form-label">
                        Pick your friends
                      </label>
                      {
                          (mem && mem.map((members) =>
                            {
                                return(
                                    
                                <div className=' m-2'>
                                <input  className="form-check-input" onChange={handlecheckbox} type="checkbox" name={members.firstname} value={members.id}/>&nbsp;&nbsp;
                                <label className="form-label">{members.firstname}</label>
                                </div>
                                )
                            }))
                          }
                     </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
            )
        })
        }


            <button className="btn btn-primary mt-3" type="submit">
            Add Expense
          </button>
            </form>
            </div> 
          </div>
      )
}

export default connect((store) => store)(GroupExpenseForm)





         




