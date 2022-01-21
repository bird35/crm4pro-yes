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

export default class CreateDeal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            title: '',
            organization: '',
            department: '',
            account: '',
            description: '',
            noCall: '',
            email: '',
            address: '',     
            phone: '',
            website: '',
            source: '',
            state: '',
            createdAt: '',
            isError: {
                name: '',
                title: '',
                organization: '',
                department: '',
                account: '',
                description: '',
                noCall: '',
                email: '',
                address: '',     
                phone: '',
                website: '',
                source: '',
                state: '',
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

        const leadObject = {
            name: this.state.name,
            title: this.state.title,
            organization: this.state.organization,
            department: this.state.department,
            account: this.state.account,
            description: this.state.description,
            noCall: this.state.noCall,
            email: this.state.email,
            address: this.state.address,     
            phone: this.state.phone,
            website: this.state.website,
            source: this.state.source,
            state: this.state.state,
            createdAt: this.state.createdAt
        };

        axios.post('http://localhost:4000/leads/create-deal', leadObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', title: '', organization: '', department: '', account: '', description: '', noCall: '', email: '', address: '', phone: '', website: '', source: '', state: '', createdAt: '' })

          // Redirect to Deal List 
         this.props.history.push('/success-alert')

    };

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "name":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "title":
                isError.title =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "organization":
                isError.organization =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "department":
                isError.department =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "account":
                isError.account =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "description":
                isError.description =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "noCall":
                isError.noCall =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;        
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "address":
                isError.address =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "phone":
                isError.name =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "website":
                isError.website =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "source":
                isError.source =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;        
            case "state":
                    isError.state =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
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
                    <label>Name</label>
                    <input
                        type="text"
                        className={isError.name.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="name"
                        onChange={this.formValChange}
                        placeholder='Deal Name'
                    />
                    {isError.name.length > 0 && (
                        <span className="invalid-feedback">{isError.name}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className={isError.title.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="title"
                        onChange={this.formValChange}
                        placeholder='Title'
                    />
                    {isError.title.length > 0 && (
                        <span className="invalid-feedback">{isError.title}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Organization</label>
                    <input
                        type="text"
                        className={isError.organization.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="organization"
                        onChange={this.formValChange}
                        placeholder='Organization'
                    />
                    {isError.organization.length > 0 && (
                        <span className="invalid-feedback">{isError.organization}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <input
                        type="text"
                        className={isError.department.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="department"
                        onChange={this.formValChange}
                        placeholder='Department'
                    />
                    {isError.department.length > 0 && (
                        <span className="invalid-feedback">{isError.department}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Account</label>
                    <input
                        type="text"
                        className={isError.account.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="account"
                        onChange={this.formValChange}
                        placeholder='Account'
                    />
                    {isError.account.length > 0 && (
                        <span className="invalid-feedback">{isError.account}</span>
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
                    <label>NoCall</label>
                    <input
                        type="text"
                        className={isError.noCall.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="noCall"
                        onChange={this.formValChange}
                        placeholder='NoCall'
                    />
                    {isError.noCall.length > 0 && (
                        <span className="invalid-feedback">{isError.noCall}</span>
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
                    <label>Website</label>
                    <input
                        type="text"
                        className={isError.website.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="website"
                        onChange={this.formValChange}
                        placeholder='Website'
                    />
                    {isError.website.length > 0 && (
                        <span className="invalid-feedback">{isError.website}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Source</label>
                    <input
                        type="text"
                        className={isError.source.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="source"
                        onChange={this.formValChange}
                        placeholder='Source'
                    />
                    {isError.source.length > 0 && (
                        <span className="invalid-feedback">{isError.source}</span>
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
                    <label>createdAt</label>
                    <input
                        type="date"
                        name="createdAt"
                        onChange={this.formValChange} 
                    />
                </div>

                <Button variant="success" size="sm" type="submit">
                    Create Deal
                </Button>{' '}

                <Button variant="secondary" size="sm" type="reset">
                    Cancel
                </Button>
                </div>
                   
                    </form> 
                    </div>
                    </div>
        );
    }
}