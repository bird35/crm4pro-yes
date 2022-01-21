import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import accountTableRow from './AccountTableRow';
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default class accountList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/accounts/')
      .then(res => {
        this.setState({
          accounts: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.accounts.map((res, i) => {
      return <accountTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper">

          <h1> Account List</h1>    
            
            <Button variant="outline-success">
                <Link className="nav-link" to={"/create-account"}>
                  Add Account
                </Link>
            </Button>
    
          <h2> </h2>

      <Table fixed striped bordered responsive hover variant="info">
        <thead>
          <tr>
            <th>assignee</th>
            <th>contactPerson</th>
            <th>name</th>
            <th>industry</th>
            <th>address</th>
            <th>state</th>
            <th>email</th>
            <th>phone</th>
            <th>CreatedAt</th>
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