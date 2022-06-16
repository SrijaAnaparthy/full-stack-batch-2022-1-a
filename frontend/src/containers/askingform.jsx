import React from 'react'
import { useNavigate } from "react-router-dom";

function AskingForm() {

    const navigate = useNavigate();

    // const navv = () =>
    // {
    //  navigate('/groups')
    // }

    function handleb1()
    {
        navigate('/groupexpenseform')
    }

    function handleb2()
    {
        navigate('/addexpense')
    }

  return (
         <div className='m-5 card p-3  mx-auto sh ' style={{ width: '400px' }}>
         <h3>Asking Form</h3><br/>

         <label className="form-label">
              Would you like to add expense to groupmembers or to friendslist?
              </label>
            <button className="btn btn-primary mt-3" onClick={handleb1} style={{width:'160px'}}>Groups</button>
            <button className="btn btn-primary mt-3" onClick={handleb2} style={{width:'160px'}}>Friends</button>
    </div>
  )
}

export default AskingForm