/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import React, { Component} from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';



export default class UserList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/')
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  DataTable() {
    return this.state.users.map((res, i) => {
      return <UserTableRow obj={res} key={i} />;
    });
  }

 

  render() {

    return (<div className="table-wrapper">

       <h1> User List</h1> 

          <h2> </h2>

      <Table fixed striped bordered responsive hover variant="inherit">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}


