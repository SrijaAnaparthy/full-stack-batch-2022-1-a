//import { ActionTypes } from "../constants/action-types";

export function getusers() {
    return(dispatch)=>
    {
        fetch("http://localhost:1000/users")
        .then((res)=>res.json())
        .then((data)=>
        {
           // console.log(data,"display data");
            dispatch({type:'GETUSERS',payload:data.users})
        })
    }
  }


export function addfriend(mail) {
    var user_mail = window.localStorage.getItem("loginuser");
    var iden = window.localStorage.getItem("userid")
    var obj = 
    {
        user_mail,
        mail : mail,
        createdby : iden
    }
    return(dispatch)=>
    {
        fetch("http://localhost:1000/addfriend",
        {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((user)=>
        {
            if(user.message === 'success')
            {
               // console.log("addfrnd",user)
                dispatch({type:'ADDFRIEND',payload:user})
                alert("Adding friend successful")
            }
        })
    }
}

export function getfriends() {
    console.log("Calling getfriends")
    var id = window.localStorage.getItem("userid");
    return(dispatch)=>
    {
      fetch("http://localhost:1000/friends/"+id,
      {
        method : 'GET',
        headers :
        {
            'Content-Type': 'application/json',
            'mode': 'no-cors',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res)=>res.json())
      .then((friends)=>
      {
        //console.log(friends,"frndsssss")
        dispatch({type:'GETFRIENDS',payload:friends[0]})
      })
    }
}

  export function addexpense(values) {
    return(dispatch)=>
    {
        var user_id = window.localStorage.getItem('userid')

        var obj ={
            ...values,createdby:user_id
        }
        fetch("http://localhost:1000/addexpense",{
            method : 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((data)=>
        {
           // console.log(data,"add expense data")
            if(data.message === 'success')
            {
                dispatch({type:'ADDEXPENSE',payload:data})
                alert("User Added Expense!!")
            }
        })
    }
}

  export function getexpense() {
    return(dispatch)=>
    {
        var id = window.localStorage.getItem("userid")
        fetch("http://localhost:1000/userspends/"+id,
        {
            method : 'GET',
            headers :
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res)=>res.json())
        .then((expense)=>
        {
            //console.log(expense[0],"expenses");
            dispatch({type:'GETEXPENSE',payload:expense[0]})
        })
    }
  }
  
export function getuserdata(expid)
{
    var id = window.localStorage.getItem("userid");
    return(dispatch) =>
    {
        fetch(`http://localhost:1000/getuserdata/${id}/${expid}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((userdetails)=>
        {
            // console.log(userdetails[0],"owed person data")
            dispatch({type:'GETUSERDATA',payload:userdetails[0]})
        })
    }
}


export function creategroup(values) {
    return(dispatch)=>
    {
        var user_id = window.localStorage.getItem('userid')
        var obj ={
            ...values,createdby:user_id,
        }
        fetch("http://localhost:1000/creategroup",{
            method : 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((data)=>
        {
           // console.log(data,"added group data")
            if(data.message === 'success')
            {
                alert("User Created Group Successfully!!")
                dispatch({type:'CREATEGROUP',payload:data})
            }
        })
    }
}


  export function getpayments(user) {
      var id = window.localStorage.getItem("userid")
    return(dispatch)=>
    {
        fetch("http://localhost:1000/payments/"+id,
        {
            method : 'GET',
            headers :
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res)=>res.json())
        .then((payments)=>
        {
            //console.log(payments);
            dispatch({type:'GETPAYMENTS',payload:payments})
        })
    }
  }


export function groupdetails() {
    var id = window.localStorage.getItem("userid");
    return(dispatch)=>
    {
      fetch("http://localhost:1000/groupdetails/"+id,
      {
        method : 'GET',
        headers :
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res)=>res.json())
      .then((data)=>
      {
       // console.log("grp data",data[0])
        dispatch({type:'GETGROUP',payload:data[0]})
      })
    }
}


export function getgrpmem(grpid)
{
   // console.log("called")
    var id = window.localStorage.getItem("userid");
    return(dispatch) =>
    {
        fetch(`http://localhost:1000/getgrpmem/${id}/${grpid}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((grpmem)=>
        {
            // console.log(grpmem[0],"grp mem data")
            dispatch({type:'GETGRPMEM',payload:grpmem[0]})
        })
    }
}


export function addgrpexpense(values,grpid) {
    return(dispatch)=>
    {
        var user_id = window.localStorage.getItem('userid')
        var obj ={
            ...values,createdby:user_id,grpid : grpid
        }
        fetch("http://localhost:1000/addgrpexpense",{
            method : 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((data)=>
        {
           // console.log(data,"add expense data")
            if(data.message === 'success')
            {
                dispatch({type:'ADDEXPENSE',payload:data})
                alert("User Added Expense!!")
            }
        })
    }
}

export function showactivity() {
    var id = window.localStorage.getItem("userid")
    return(dispatch)=>
    {
      fetch("http://localhost:1000/showactivity/"+id,
      {
        method : 'GET',
        headers :
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res)=>res.json())
      .then((data)=>
      {
       // console.log("grp data",data[0])
        dispatch({type:'SHOWACTIVITY',payload:data[0]})
      })
    }
}


export function transaction(expid)
{
    var id = window.localStorage.getItem("userid");
    return(dispatch) =>
    {
        fetch(`http://localhost:1000/transaction/${id}/${expid}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((result)=>result.json())
        .then((userdetails)=>
        {
            console.log(userdetails[0],"owed person data")
            dispatch({type:'TRANSACTION',payload:userdetails[0]})
        })
    }
}


export function sendverification(mobileno) {
    return(dispatch)=>
    {
        fetch("http://localhost:1000/send-verification-otp",{
            method : 'POST',
            body: JSON.stringify(mobileno),
        })
        .then((result)=>result.json())
        .then((data)=>
        {
            if(data.message === 'success')
            {
                dispatch({type:'SENDVERIFICATION',payload:data})
            }
        })
    }
}


export function checkverification(mobileno,code) {
    return(dispatch)=>
    {
        var obj = 
        {
            mobileno,code
        }
        fetch("http://localhost:1000//verify-otp",{
            method : 'POST',
            body: JSON.stringify(obj),
        })
        .then((result)=>result.json())
        .then((data)=>
        {
            if(data.message === 'success')
            {
                dispatch({type:'CHECKVERIFICATION',payload:data})
            }
        })
    }
}
