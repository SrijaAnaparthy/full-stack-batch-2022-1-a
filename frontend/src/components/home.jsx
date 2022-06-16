import React,{useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getusers} from "../actions/actions"
import {connect} from 'react-redux'
import {Card,Button,Col,Row,Container} from 'react-bootstrap'

function Home(props)
{   
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getusers())
        //dispatch(addfriend())
     },[dispatch])
    
          //const users = props.users;
     const {users={}} = props;
     console.log("Users dataaaa",users)

     //var loguser = window.localStorage.getItem("loginuser")
     
     const navigate = useNavigate();

     const navv = () =>
     {
      navigate('/groups')
     }

     const nav2 = () =>
     {
      navigate('/transactions')
     }

     const nav1 = () =>
     {
      navigate('/activity');
     }
    return(
    <div>



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

  <Container>
<Row className="d-flex">
  <Col>
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" className="flex-fill" src="/images/img/groupimg.jpg" />
  <Card.Body>
    <Card.Title>GROUPS</Card.Title>
    <Card.Text>
      Here you can create and manage groups
    </Card.Text>
    <Button variant="primary" onClick={navv}>Groups</Button>
  </Card.Body>
</Card>
</Col>

<Col>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" className="flex-fill" src="/images/img/activityimg.jpg" />
  <Card.Body>
    <Card.Title>Activity</Card.Title>
    <Card.Text>
      Here you can create and manage groups
    </Card.Text>
    <Button variant="primary" onClick={nav1}>Activity</Button>
  </Card.Body>
</Card>
</Col>

<Col>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" className="flex-fill" src="/images/img/friendsimg.jpg" />
  <Card.Body>
    <Card.Title>Friends</Card.Title>
    <Card.Text>
      Here you can add and manage Friends
    </Card.Text>
    <Button variant="primary" onClick={nav2}>Friends</Button>
  </Card.Body>
</Card>
</Col>

<Col>
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" className="flex-fill" src="/images/img/accountimg.jpg" />
  <Card.Body>
    <Card.Title>Account</Card.Title>
    <Card.Text>
      Here you can manage Account and view actions
    </Card.Text>
    <Button variant="primary">Account</Button>
  </Card.Body>
</Card>
</Col>

</Row>
</Container>



    </div>
)}

export default connect((store) => store)(Home)