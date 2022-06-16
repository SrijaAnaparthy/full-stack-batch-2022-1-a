import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { getfriends} from "../actions/actions"
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

function FriendList(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
     // console.log("callign dispatch");
        dispatch(getfriends())
        //dispatch(addfriend())
     },[dispatch])
    
    // console.log(props,"props")
          const users = props.users;
          //console.log("users",users)

     const mydata = users.friends;


    return(<div>

                <h1>Friends list</h1>
{ mydata.length && 
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>FirstName</th>
      <th>LastName</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
{ mydata.map((user,i)=>
{
return(
    <tr>
      <td>{++i}</td>
      <td>{user.firstname}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
    </tr>
     )
    }
 )}
  </tbody>
</Table>
}
    </div>
)}

export default connect((store) => store)(FriendList)