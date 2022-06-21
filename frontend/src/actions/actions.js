//import { ActionTypes } from "../constants/action-types";
const BE_HOST= "https://breakthepriceapp-backend.herokuapp.com"

export function getusers() {
    return(dispatch)=>
    {
        fetch(`${BE_HOST}/users`)
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
        fetch(`${BE_HOST}/addfriend`,
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
      fetch(`${BE_HOST}/friends/`+id,
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
        fetch(`${BE_HOST}/addexpense`,{
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
        fetch(`${BE_HOST}/userspends/`+id,
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
        fetch(`${BE_HOST}/getuserdata/${id}/${expid}`,
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
        fetch(`${BE_HOST}/creategroup`,{
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
        fetch(`${BE_HOST}/payments/`+id,
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
      fetch(`${BE_HOST}/groupdetails/`+id,
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
        fetch(`${BE_HOST}/getgrpmem/${id}/${grpid}`,
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
        fetch(`${BE_HOST}/addgrpexpense`,{
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
      fetch(`${BE_HOST}/showactivity/`+id,
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
        fetch(`${BE_HOST}/transaction/${id}/${expid}`,
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
        fetch(`${BE_HOST}/send-verification-otp`,{
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
        fetch(`${BE_HOST}/verify-otp`,{
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


export function settlemoney(exp,memberid) {
    console.log("settle amount called",exp,memberid)
    var id = window.localStorage.getItem("userid");
    return(dispatch)=>
    {
        var obj ={
           userid : id,
           memid : memberid,
           expid : exp
        }
        fetch(`${BE_HOST}/settlemoney`,{
            method : 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'mode': 'no-cors',
            }
        })
        .then((result)=>result.json())
        .then((data)=>
        {
            console.log(data,"add expense data")
            if(data.message === 'success')
            {
                dispatch({type:'SETTLEMONEY',payload:data})
                dispatch(transaction(exp))
                alert("Payment done!!")
            }
        })
    }
}
