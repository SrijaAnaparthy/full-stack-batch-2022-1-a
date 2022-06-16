import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { getexpense,getuserdata} from "../actions/actions"
import {connect} from 'react-redux'
import {Table,Button} from 'react-bootstrap'

function MyExpense(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getexpense())
        //dispatch(addfriend())
     },[dispatch])
    
    // console.log(props,"props")
          const users = props.users;
         console.log("users",users);

    const mydata = users.expense;
    console.log(mydata,"mydata");

    const userdetails = users.userdetails;
    console.log(userdetails,"userdetails");
    

    var loguser = window.localStorage.getItem("loginuser")

    function handlefunc(id)
    {
      
      console.log(id,"exp id")
     dispatch(getuserdata(id))
    }

    return(<div>

{ mydata.length && 
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Investor</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
{ mydata.map((user,i)=>
{
return(
    <tr>
      <td>{++i}</td>
      <td>{loguser}</td>
      <td>{user.description}</td>
      <td>{user.amount}</td>
      <td><Button onClick={() => {handlefunc(user.id)}} >User Details</Button></td>
    </tr>
     )
    }
 )}
  </tbody>
</Table>
}
  </div>
)}


export default connect((store) => store)(MyExpense)