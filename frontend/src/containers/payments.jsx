import React from 'react'
import {Table} from 'react-bootstrap'

function Payments() {
  var loguser = window.localStorage.getItem("username")
  var usermail = window.localStorage.getItem("loginuser")

  return (
    <div>
      <div>
        <Table striped bordered hover>
          <tbody>
            <tr>
            <label>
            Username 
          </label>
          <td>{loguser}</td>
          <label>
            User mail
          </label>
          <td>{usermail}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>

  )
}

export default Payments