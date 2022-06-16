import React from 'react'
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
//import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import Home from './home'
import Groups from '../containers/groups'
import GroupExpenseForm from '../containers/groupexpenseform'
import ForgetPassword from './forgetpswd'
import Friendslist from '../containers/friendslist'
import Userslist from '../containers/userslist'
import MyExpenses from '../containers/myexpenses'
import Payments from '../containers/payments'
import AddFriend from '../containers/addfriend'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ExpenseForm from '../containers/expenseform';
import Signup from '../components/signup'
import Transactions from '../containers/transactions'
import Login from '../components/login'
import UserDetails from '../containers/userdetails'
import AskingForm from '../containers/askingform'
import ActivityRec from '../containers/activityrec'
import OtpVerification from '../components/otpverification'

function NavbarComponent() {
  var loguser = window.localStorage.getItem("loginuser")


  //const navigate = useNavigate();
  // function Logout()
  // {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('loginuser')
  //   localStorage.removeItem('userid')
  //  navigate('/signup')
  // }

  
  
  return (
    <BrowserRouter>
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#">Dashboard</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
              {/* <Nav.Link as={Link} to={'/logout'} onClick={()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('loginuser')
                  localStorage.removeItem('userid')
                }}>Logout</Nav.Link> */}
                <Nav.Link as={Link} to={'/'}></Nav.Link>
              {
                loguser ? 
                <>
                  <Nav.Link as={Link} to={'/home'}>Home</Nav.Link>
                  <Nav.Link as={Link} to={"/userslist"}>UsersList</Nav.Link>
                  <Nav.Link as={Link} to={"/friendslist"}>FriendsList</Nav.Link>
                  <Nav.Link as={Link} to={'/addfriend'}>Add Friend</Nav.Link>
                  <Nav.Link as={Link} to={'/askingform'}>Add Expense</Nav.Link>
                  <Nav.Link as={Link} to={'/myexpense'}>My Expenses</Nav.Link>
                  <Nav.Link as={Link}to={'/payments'}>Payments</Nav.Link>
                  <Nav>
      {/* <Nav.Link as={Link} to={'#'}>{loguser}</Nav.Link> */}
      <NavDropdown title={loguser} className="bg-dark">
            <NavDropdown.Item className="bg-dark" onClick={()=>{
                  localStorage.removeItem('token')
                  localStorage.removeItem('loginuser')
                  localStorage.removeItem('userid')
                  window.location.reload ()
                //navigate('/signup')
                }}><Nav.Link as={Link} to={'/login'}>Logout</Nav.Link>
             </NavDropdown.Item>
      </NavDropdown>
    </Nav>
                </>
                :
                <>
                  <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                  <Nav.Link as={Link} to={'/signup'}>SignUp</Nav.Link>
                </>
              }
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

<div>
          <Routes>
            <Route path="/home" element={loguser ? <Home/> : <Login/>}></Route>
            <Route path='/forgetpswd' element={<ForgetPassword/>}></Route>
            <Route path="/friendslist" element={<Friendslist/>}></Route>
            <Route path="/userslist" element={<Userslist/>}></Route>
            <Route path="/addfriend" element={<AddFriend/>}></Route>
            <Route path="/askingform" element={<AskingForm/>}></Route>
            <Route path="/myexpense" element={<MyExpenses/>}></Route>
            <Route path="/payments" element={<Payments/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/logout" element={<Login/>}></Route>
            <Route path="/userdetails" element={<UserDetails/>}></Route>
            <Route path="/groups" element={<Groups/>}></Route>
            <Route path="/groupexpenseform" element={<GroupExpenseForm/>}></Route>
            <Route path="/askingform" element={<AskingForm/>}></Route>
            <Route path='/addexpense' element={<ExpenseForm/>}></Route>
            <Route path="/transactions" element={<Transactions/>}></Route>
            <Route path="/activity" element={<ActivityRec/>}></Route>
            <Route path="/otpverification" element={<OtpVerification/>}></Route>
          </Routes>
</div>
    </div>
    </BrowserRouter>
  )
}

export default connect((store) => store)(NavbarComponent)
