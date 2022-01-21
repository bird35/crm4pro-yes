/* eslint-disable no-undef */
import React, { Component } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';

import "semantic-ui-css/semantic.min.css";
import 'semantic-ui-react';

import { Table } from "semantic-ui-react";

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

export default class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            subject: '',
            description: '',
            createdBy: '',
            assignedTo: '',
            isCompleted: '',
            //createdAt: '',
            dueDate: '',
            completedAt: '',
            isError: {
                subject: '',
                description: '',
                createdBy: '',
                assignedTo: '',
                isCompleted: '',
                //createdAt: '',
                dueDate: '',
                completedAt: ''
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }

        const taskObject = {
            subject: this.state.subject,
            description: this.state.description,
            createdBy: this.state.createdBy,
            assignedTo: this.state.assignedTo,
            isCompleted: this.state.isCompleted,    
            //createdAt: this.state.createdAt,
            dueDate: this.state.dueDate,
            completedAt: this.state.completedAt
        };

        axios.post('http://localhost:4000/tasks/create-task', taskObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ subject: '', description: '', createdBy: '', assignedTo: '', isCompleted: '', isPending: '', createdAt: '', dueDate: '', completedAt: '' })

          // Redirect to task List 
         this.props.history.push('/success-alert')

    };

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "subject":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "description":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "createdBy":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "assignedTo":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;    
            case "isCompleted":
                isError.email = regExp.test(value)
                    ? ""
                    : "isCompleted is invalid";
                break;
            case "dueDate":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "completedAt":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;          
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
        })
    };

    render() {
        const { isError } = this.state;

        return (

            <div className="col-md-12">
            <div className="card card-container">
                <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                />
          
            <form success onSubmit={this.onSubmit} noValidate>
                 <Table bordered>
                <div className="container col-12">
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        className={isError.subject.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="subject"
                        onChange={this.formValChange}
                        placeholder='task Subject'
                    />
                    {isError.subject.length > 0 && (
                        <span className="invalid-feedback">{isError.subject}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className={isError.description.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="description"
                        onChange={this.formValChange}
                        placeholder='Description'
                    />
                    {isError.description.length > 0 && (
                        <span className="invalid-feedback">{isError.description}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>CreatedBy</label>
                    <input
                        type="text"
                        className={isError.createdBy.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="createdBy"
                        onChange={this.formValChange}
                        placeholder='Created By'
                    />
                    {isError.createdBy.length > 0 && (
                        <span className="invalid-feedback">{isError.createdBy}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>AssignedTo</label>
                    <input
                        type="text"
                        className={isError.assignedTo.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="assignedTo"
                        onChange={this.formValChange}
                        placeholder='Assigned To'
                    />
                    {isError.assignedTo.length > 0 && (
                        <span className="invalid-feedback">{isError.assignedTo}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>IsCompleted</label>
                    <input
                        type="checkbox"
                        className={isError.isCompleted.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="isCompleted"
                        onChange={this.formValChange}
                        placeholder='Is Completed'
                    />
                    {isError.isCompleted.length > 0 && (
                        <span className="invalid-feedback">{isError.isCompleted}</span>
                    )}
                    </div>  

                <div className="form-group">
                    <label>DueDate</label>
                    <input
                        type="date"
                        className={isError.dueDate.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="dueDate"
                        onChange={this.formValChange}
                        placeholder='Due Date'
                    />
                    {isError.dueDate.length > 0 && (
                        <span className="invalid-feedback">{isError.dueDate}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>CompletedAt</label>
                    <input
                        type="date"
                        className={isError.completedAt.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="completedAt"
                        onChange={this.formValChange}
                        placeholder='Completed At'
                    />
                    {isError.completedAt.length > 0 && (
                        <span className="invalid-feedback">{isError.completedAt}</span>
                    )}
                </div>
                <Button variant="success" size="sm" type="submit">
                    Create Task
                </Button>{' '}

                <Button  variant="secondary" size="sm" type="reset">
                    Cancel
                </Button>
                </div> 
                </Table>        
                    </form>
                    </div>
                    </div>
            
        );
    }
}