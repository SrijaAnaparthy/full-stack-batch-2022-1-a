import React,{useEffect,useState} from "react";
import {useDispatch} from 'react-redux';
import { addfriend, getusers} from "../actions/actions"
import {connect} from 'react-redux'

function AddFriend(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getusers())
        //dispatch(addfriend())
     },[dispatch])
    
     const {users={}} = props;
     const mydata = users.users;

     const [value,setvalue] = useState('');
    // var loguser = window.localStorage.getItem("loginuser")

    let options = [...mydata];

    const array = [];
    
    if(options)
    {
        options.map((x) =>
        {
             return array.push(x.email);
        })
    }

    function add()
    {
       // console.log(value)
       dispatch(addfriend(value))
    }

    function onSearch(f)
    {
        setvalue(f)
    }
    

    return(<div>
        
           <div>
               <h1>Data</h1>
                  
               
               <div className="search-container">
                    <div className="d-flex">
             <input type="text" value={value} className="form-control"  placeholder="Enter Email" onChange={(e)=>{setvalue(e.target.value)}}></input>
             <button className="btn btn-success" onClick={add}>addFriend</button>

           </div>
           <div className="dropdown">
             {
               array &&
               array.filter((f)=>{
                const searchterm=value.toLowerCase()
                const mailid=f.toLowerCase()
                return( searchterm && mailid.startsWith(searchterm));

               })
               .map((f)=>{
                 return(
                   <div key={f} onClick={() => onSearch(f)}>
                     {f}
                     </div>
                 )
               })
              }

           </div>

               </div>
           </div>
          
    </div>
)}

export default connect((store) => store)(AddFriend)