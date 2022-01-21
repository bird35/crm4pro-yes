import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import LeadTableRow from './LeadTableRow';

import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class LeadList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      leads: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/leads/')
      .then(res => {
        this.setState({
          leads: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.leads.map((res, i) => {
      return <LeadTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">

          <h1> Lead List</h1>    
            
            <Button variant="outline-success">
                <Link className="nav-link" to={"/create-lead"}>
                  Add Lead
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
            <th>Account</th>
            <th>Description</th>
            <th>NoCall</th>  
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Source</th>
            <th>State</th> 
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