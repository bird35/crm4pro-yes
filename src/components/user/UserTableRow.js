import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class UserTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(_id, e) {
        axios.delete('http://localhost:4000/users/delete-user/' + this.props.obj._id)
            .then((res) => {
                console.log('User successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            // eslint-disable-next-line no-restricted-globals
            location.reload();
    }


    render() {
        return (

            <tr>
                <td>{this.props.obj._id}</td>
                <td>{this.props.obj.firstName}</td>
                <td>{this.props.obj.lastName}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.createdAt}</td>
                <td>{this.props.obj.updatedAt}</td>
                <td>
                   
                    <Link className="edit-link" style={{display: "table-cell"}} to={"/edit-user/" + this.props.obj._id}>    
                        Edit
                    </Link>
                    <Button size="sm" variant="danger" onClick={(e) => this.deleteUser(this.props.obj._id, e)} >Delete</Button>
                </td>
            </tr>

        );
    }
}