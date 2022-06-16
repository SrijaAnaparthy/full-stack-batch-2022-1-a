import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import {showactivity } from "../actions/actions"
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

function ActivityRec(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(showactivity())
     },[dispatch])
    
    const users = props.users;
    const mydata = users.rec;


    return(<div>

                <h1>Activity Record</h1>
{ mydata.length && 
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Task Name</th>
      <th>Created Time</th>
    </tr>
  </thead>
  <tbody>
{ mydata.map((user,i)=>
{
return(
    <tr>
      <td>{++i}</td>
      <td>{user.taskname}</td>
      <td>{user.date}</td>
    </tr>
     )
    }
 )}
  </tbody>
</Table>
}
    </div>
)}

export default connect((store) => store)(ActivityRec)