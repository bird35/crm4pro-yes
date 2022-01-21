import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import DealTableRow from './DealTableRow';

import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class DealList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deals: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/deals/')
      .then(res => {
        this.setState({
          deals: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.deals.map((res, i) => {
      return <DealTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">

          <h1> Deal List</h1>    
            
            <Button variant="outline-success">
                <Link className="nav-link" to={"/create-deal"}>
                  Add Deal
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