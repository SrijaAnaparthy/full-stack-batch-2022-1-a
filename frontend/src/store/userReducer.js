import { ActionTypes } from '../constants/action-types'

const intialState = 
{
  users : [],
  friends : [],
  expense : [],
  userdetails : [],
  grpmem : [],
  payments : [],
  rec : [],
  tdata : []
}

export const Reducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GETUSERS:
      //console.log(state.users,payload,"payload data")
     // return { ...state, users: [...state.users, payload] }
      return {...state,users : [...payload]}

    case ActionTypes.GETFRIENDS:
    // console.log(state.friends,payload,"payload data")
     return {...state,friends : (payload || [])}

    case ActionTypes.GETEXPENSE:
      // console.log("get expense called")
      // console.log(payload,"exp payload")
        return {...state,expense : [...payload]}

    case ActionTypes.GETPAYMENTS:
        return {}

    case ActionTypes.ADDFRIEND:
        return {...state,data : [...payload]}

    case ActionTypes.ADDEXPENSE:
     // console.log(state.users,payload,"payload data")
        return {...state, status : true}
      
    case ActionTypes.GETUSERDATA:
      console.log(payload,"getuser details")
      return {...state, userdetails : [...payload]}

    case ActionTypes.CREATEGROUP:
        return {...state,data : [...payload]}
    
    case ActionTypes.GETGROUP:
      console.log("data",payload)
        return {...state, data : [...payload]}

    case ActionTypes.GETGRPMEM:
    //  console.log(payload,"pay load")
      return {...state,grpmem : [...payload]}
    case ActionTypes.SHOWACTIVITY:
      //console.log("data comingg",payload)
      return {...state,rec : [...payload]}

    case ActionTypes.TRANSACTION :
    //  console.log(payload,"payload coming")
      return {...state,tdata : [...payload]}

    case ActionTypes.SENDVERIFICATION :
        return {msg : [...payload]}
    case ActionTypes.CHECKVERIFICATION:
        return {otp : [...payload]}
    default:
      return state
  }
}
