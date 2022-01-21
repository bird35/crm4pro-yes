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

export default class CreateContact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            title: '',
            organization: '',
            department: '',
            email: '',
            address: '',     
            phone: '',
            website: '',
            source: '',
            state: '',
            country: '',
            isError: {
                name: '',
                title: '',
                organization: '',
                department: '',
                email: '',
                address: '',     
                phone: '',
                website: '',
                source: '',
                state: '',
                country: ''
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

        const contactObject = {
            name: this.state.name,
            title: this.state.title,
            organization: this.state.organization,
            department: this.state.department,
            email: this.state.email,
            address: this.state.address,     
            phone: this.state.phone,
            website: this.state.website,
            source: this.state.source,
            state: this.state.state,
            createdAt: this.state.createdAt
        };

        axios.post('http://localhost:4000/contacts/create-contact', contactObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', title: '', organization: '', department: '', email: '', address: '', phone: '', website: '', source: '', state: '', createdAt: '' })

          // Redirect to Contact List 
         this.props.history.push('/success-alert')

    };

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "name":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;
            case "title":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;
            case "organization":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;
            case "department":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;    
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "address":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;
            case "phone":
                isError.name =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "website":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;
            case "source":
                isError.name =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
                break;        
            case "state":
                    isError.password =
                    value.length < 1 ? "Atleast 1 characaters required" : "";
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
                        placeholder='Contact Name'
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
                    <label>Country</label>
                    <input
                        type="text"
                        className={isError.state.length > 0 ? "is-invalid form-control" : "form-control"}
                        name="country"
                        onChange={this.formValChange}
                        placeholder='Country'
                    />
                    {isError.state.length > 0 && (
                        <span className="invalid-feedback">{isError.state}</span>
                    )}
                </div>


            

                <Button variant="success" size="sm" type="submit">
                    Create Contact
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