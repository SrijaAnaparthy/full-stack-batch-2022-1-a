import React,{useEffect,useState} from "react";
import {useDispatch} from 'react-redux';
import { getexpense,transaction} from "../actions/actions"
import {connect} from 'react-redux'
import {Table,Button} from 'react-bootstrap'
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

function Transactions(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getexpense())
        //dispatch(addfriend())
     },[dispatch])

     
    
    
    // console.log(props,"props")
          const users = props.users;
        // console.log("users",users);

    const mydata = users.expense;
   // console.log(mydata,"mydata");

    const tdata = users.tdata;
    console.log(tdata);

    const [display,setdisplay] = useState();
    const [d,setd] = useState(false);

   // const tdetails = 

     function openModal(mydata)
     {
        setdisplay({tdata})
        setd(true)
     }

     function closeModal()
     {
        setdisplay({tdata : null})
        setd(false)
     }

    var loguser = window.localStorage.getItem("loginuser")

    function handlefunc(id)
    {
      
      //console.log(id,"exp id")
     dispatch(transaction(id))
    }

    // function transactiondata()
    // {

    // }

    return(<div>

{ mydata.length && 
<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Investor</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Transaction Details</th>
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
      <td><Button   onClick={() => {handlefunc(user.id); openModal(tdata)}} >Transaction Details</Button></td>
    </tr>
     )
    }
 )}
  </tbody>
</Table>
}

{/* onClick={() => {handlefunc(user.id)}} */}

      
{
 tdata.length && d &&
  (
      <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
  
          <Zoom>
              <button className="close-modal" onClick={closeModal} onRequestClose={closeModal}>
                  X
              </button>
              <div>
                  
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>OwedPerson Name</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Transaction Time</th>
        <th>GroupId</th>
      </tr>
    </thead>
    <tbody>
  { tdata.map((user,i)=>
  {
  return(
      <tr>
        <td>{++i}</td>
        <td>{user.owedperson}</td>
        <td>{user.description}</td>
        <td>{user.divamount}</td>
        <td>{user.createdat}</td>
        <td>{user.grpid ? user.grpid : 'not a group member'}</td>
        <td><Button >Settle Amount</Button></td>
      </tr>
       )
      }
   )}
    </tbody>
  </Table>
              </div>
          </Zoom>
  
      </Modal>
  )
    }

  </div>
)}


export default connect((store) => store)(Transactions)