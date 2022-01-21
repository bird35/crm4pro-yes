import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TaskTableRow from './TaskTableRow';

import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: []
      };
      
  
    };
  

  componentDidMount() {
    axios.get('http://localhost:4000/tasks/')
      .then(res => {
        this.setState({
          tasks: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.tasks.map((res, i) => {
      return <TaskTableRow obj={res} key={i} />;
    });
  }
  

  render() {

    

    return (<div className="table-wrapper">


          <h1> Task List</h1>    
            
            
            <Button variant="outline-success">
                <Link className="nav-link" to={"/create-task"}>
                  Add Task
                </Link>
            </Button>

          <h2> </h2>

      <Table fixed striped bordered responsive hover variant="info">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>CreatedBy</th>
            <th>AssignedTo</th>  
            <th>isCompleted</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>DueDate</th>
            <th>CompletedAt</th>
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
  