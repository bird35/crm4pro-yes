import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class accountTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    deleteaccount(_id, e) {
        axios.delete('http://localhost:4000/accounts/delete-account/' + this.props.obj._id)
            .then((res) => {
                console.log('account successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            // eslint-disable-next-line no-restricted-globals
            location.reload();
    }


    render() {
        return (

            <tr>
                <td>{this.props.obj.assignee}</td>
                <td>{this.props.obj.contactPerson}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.industry}</td>
                <td>{this.props.obj.address}</td>
                <td>{this.props.obj.state}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.phone}</td>
                <td>{this.props.obj.createdAt}</td>
                <td>
                    <Link className="edit-link" style={{display: "table-cell"}} to={"/edit-account/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger" onClick={(e) => this.deleteAccount(this.props.obj._id, e)} >Delete</Button>
                </td>
            </tr>

        );
    }
}