import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import {getusers} from "../actions/actions"
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

function UsersList(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getusers())
     },[dispatch])
    
  

     const {users={}} = props;
    // console.log("Users dataaaa",users)
     const mydata = users.users;



    return(<div>
          {/* <div className="container">
              <nav class="navbar navbar-light bg-light">
            
                <Link to='/home' class="navbar-brand">Home</Link>
                <Link to="/userslist" class="navbar-brand">UsersList</Link>
                <Link to="/friendslist" class="navbar-brand">FriendList</Link>
                <Link to='/addfriend' class="navbar-brand">Add Friend</Link>
                <Link to='/addexpense' class="navbar-brand">Add Expense</Link>
                <Link to='/myexpense' class="navbar-brand">MyExpenses</Link>
                <Link to='/payments' class="navbar-brand">Payments</Link>
                <Link to='/logout' class="navbar-brand" onClick={()=>{
                  localStorage.removeItem('token')
                }} >Logout</Link>
            </nav>
        </div> */}
        
        
           <div>
                <h2>Users List</h2>
                {/* { mydata.length && 
                     <table className="mytable">
                     <thead>
                         <tr>
                     <th className="mytable">FirstName</th>
                     <th className="mytable">LastName</th>
                     <th className="mytable">Email</th>
                     </tr>
                     </thead>
                     <tbody>
                    {  mydata.map((user,i)=>
                    {
                       return(
                        <tr key={i}>
                        <td className="mytable">{user.firstname}</td>
                        
                        <td className="mytable">{user.lastname}</td>
                        <td className="mytable">{user.email}</td>
                    </tr>
                       )
                       }
                    )}
                     </tbody>
                 </table>
                } */}

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
          
    </div>
)}

export default connect((store) => store)(UsersList)