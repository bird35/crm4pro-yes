import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ContactTableRow from './ContactTableRow';

import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ContactList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts/')
      .then(res => {
        this.setState({
          contacts: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.contacts.map((res, i) => {
      return <ContactTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">

          <h1>Contact List</h1>    
            
            <Button variant="outline-success">
                <Link className="nav-link" to={"/create-contact"}>
                  Add Contact
                </Link>
            </Button>
    
          <h2> </h2>

      <Table fixed striped bordered responsive hover variant="info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Organization</th>
            <th>Department</th>  
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Source</th>
            <th>State</th>
            <th>country</th> 
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