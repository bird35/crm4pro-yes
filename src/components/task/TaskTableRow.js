import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class TaskTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask(_id, e) {
        axios.delete('http://localhost:4000/tasks/delete-task/' + this.props.obj._id)
            .then((res) => {
                console.log('task successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            // eslint-disable-next-line no-restricted-globals
            //location.reload();

    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.subject}</td>
                <td>{this.props.obj.description}</td>
                <td>{this.props.obj.createdBy}</td>
                <td>{this.props.obj.assignedTo}</td>
                <td>{this.props.obj.isCompleted}</td>
                <td>{this.props.obj.createdAt}</td>
                <td>{this.props.obj.updatedAt}</td>
                <td>{this.props.obj.dueDate}</td>
                <td>{this.props.obj.completedAt}</td>
                <td>
                    <Link className="edit-link" style={{display: "table-cell"}} to={"/edit-task/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger" onClick={(e) => this.deleteTask(this.props.obj._id, e)} >Delete</Button>
                </td>
            </tr>


        );
    }
}