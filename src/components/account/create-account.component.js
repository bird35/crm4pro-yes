/* eslint-disable no-undef */
import React, { Component } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';

import "semantic-ui-css/semantic.min.css";
import 'semantic-ui-react';

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

export default class CreateAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            assignee: '',
            contactPerson: '',
            industry: '',
            address: '',
            state: '',
            country: '',
            email: '',
            phone: '',
            createdAt: '',
            isError: {
                name: '',
                assignee: '',
                contactPerson: '',
                industry: '',
                address: '',
                state: '',
                country: '',
                email: '',
                phone: '',
                createdAt: ''
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

        const accountObject = {
            name: this.state.name,
            assignee: this.state.assignee,
            contactPerson: this.state.contactPerson,
            industry: this.state.industry,
            address: this.state.address,
            state: this.state.state,
            country: this.state.country,
            email: this.state.email,
            phone: this.state.phone,
            createdAt: this.state.createdAt
        };

        axios.post('http://localhost:4000/accounts/create-account', accountObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ 
            name: '',
            assignee: '',
            contactPerson: '',
            industry: '',
            address: '',
            state: '',
            country: '',
            email: '',
            phone: '',
            createdAt: ''
         })

          // Redirect to Account List 
         this.props.history.push('/success-alert')

    };

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "createdAt":
                    isError.createdAt =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
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
                
                <div className="container col-12">
                <div className="form-group">
                    <label>Assignee</label>
                    <input
                        type="text"
                        className={isError.assignee.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="assignee"
                        onChange={this.formValChange}
                        placeholder='Assignee Name'
                    />
                    {isError.assignee.length > 0 && (
                        <span className="invalid-feedback">{isError.assignee}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>ContactPerson</label>
                    <input
                        type="text"
                        className={isError.contactPerson.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="contactPerson"
                        onChange={this.formValChange}
                        placeholder='Contact Person'
                    />
                    {isError.contactPerson.length > 0 && (
                        <span className="invalid-feedback">{isError.contactPerson}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="name"
                        onChange={this.formValChange}
                        placeholder='Name'
                    />
                    {isError.name.length > 0 && (
                        <span className="invalid-feedback">{isError.name}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Industrie</label>
                    <input
                        type="text"
                        className={isError.industry.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="industrie"
                        onChange={this.formValChange}
                        placeholder='Industrie'
                    />
                    {isError.industry.length > 0 && (
                        <span className="invalid-feedback">{isError.industry}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className={isError.address.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="address"
                        onChange={this.formValChange}
                        placeholder='Address'
                    />
                    {isError.address.length > 0 && (
                        <span className="invalid-feedback">{isError.address}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        className={isError.state.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="state"
                        onChange={this.formValChange}
                        placeholder='State'
                    />
                    {isError.state.length > 0 && (
                        <span className="invalid-feedback">{isError.state}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="email"
                        onChange={this.formValChange}
                        placeholder='Email'
                    />
                    {isError.email.length > 0 && (
                        <span className="invalid-feedback">{isError.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className={isError.phone.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="phone"
                        onChange={this.formValChange}
                        placeholder='Phone'
                    />
                    {isError.phone.length > 0 && (
                        <span className="invalid-feedback">{isError.phone}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>createdAt</label>
                    <input
                        type="date"
                        name="createdAt"
                        onChange={this.formValChange} 
                    />
                </div>

                <Button variant="success" size="sm" type="submit">
                    Create Account
                </Button>{' '}

                <Button href="/account-list/" variant="secondary" size="sm">
                    Cancel
                </Button>
                </div> 
                    </form> 
                    </div>
                    </div>
        )
    }
}