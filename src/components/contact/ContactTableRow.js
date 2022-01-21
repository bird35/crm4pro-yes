import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ContactTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
    }

    deleteContact(_id, e) {
        axios.delete('http://localhost:4000/contacts/delete-contact/' + this.props.obj._id)
            .then((res) => {
                console.log('Contact successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            // eslint-disable-next-line no-restricted-globals
            location.reload();
    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.title}</td>
                <td>{this.props.obj.organization}</td>
                <td>{this.props.obj.department}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.address}</td>
                <td>{this.props.obj.phone}</td>
                <td>{this.props.obj.website}</td>
                <td>{this.props.obj.source}</td>
                <td>{this.props.obj.state}</td>
                <td>{this.props.obj.country}</td>
                <td>{this.props.obj.createdAt}</td>
                <td>{this.props.obj.updatedAt}</td>
                <td>
                    <Link className="edit-link" style={{display: "table-cell"}} to={"/edit-contact/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger" onClick={(e) => this.deleteContact(this.props.obj._id, e)} >Delete</Button>
                </td>
            </tr>

        );
    }
}