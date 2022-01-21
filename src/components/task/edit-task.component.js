import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditTask extends Component {

  constructor(props) {
    super(props)

    this.onChangeTaskSubject = this.onChangeTaskSubject.bind(this);
    this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
    this.onChangeTaskCreatedBy = this.onChangeTaskCreatedBy.bind(this);
    this.onChangeTaskAssignedTo = this.onChangeTaskAssignedTo.bind(this);
    this.onChangeTaskIsCompleted = this.onChangeTaskIsCompleted.bind(this);
    //this.onChangeTaskCreatedAt = this.onChangeTaskCreatedAt.bind(this);
    this.onChangeTaskDueDate = this.onChangeTaskDueDate.bind(this);
    this.onChangeTaskCompletedAt = this.onChangeTaskCompletedAt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
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

  componentDidMount() {
    axios.get('http://localhost:4000/tasks/edit-task/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          subject: res.data.subject,
          description: res.data.description,
          createdBy: res.data.createdBy,
          assignedTo: res.data.assignedTo,
          isCompleted: res.data.isCompleted,    
          //createdAt: res.data.createdAt,
          dueDate: res.data.dueDate,
          completedAt: res.data.completedAt
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeTaskSubject(e) {
    this.setState({ subject: e.target.value })
  }

  onChangeTaskDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeTaskCreatedBy(e) {
    this.setState({ createdBy: e.target.value })
  }

  onChangeTaskAssignedTo(e) {
    this.setState({ assignedTo: e.target.value })
  }

  onChangeTaskIsCompleted(e) {
    this.setState({ isCompleted: e.target.value })
  }

  onChangeTaskDueDate(e) {
    this.setState({ dueDate: e.target.value })
  }

  onChangeTaskCompletedAt(e) {
    this.setState({ completedAt: e.target.value })
  }

  onChangeTaskState(e) {
    this.setState({ state: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

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

    axios.put('http://localhost:4000/tasks/update-task/' + this.props.match.params._id, taskObject)
      .then((res) => {
        console.log(res.data)
        console.log('Task successfully updated');
      }).catch((error) => {
        console.log(error)
      })

       this.setState({ subject: '', description: '', createdBy: '', assignedTo: '', isCompleted: '', isPending: '', createdAt: '', dueDate: '', completedAt: '' })

       // Redirect to task List 
      this.props.history.push('/success-alert')
  }

  render() {

    return (
    
      <div className="col-md-12">
      <div className="card card-container">
          <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
          />
    
    <div className="form-wrapper">

      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="Subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" value={this.state.subject} onChange={this.onChangeTaskSubject} />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="textarea" value={this.state.description} onChange={this.onChangeTaskDescription} />
        </Form.Group>

        <Form.Group controlId="CreatedBy">
          <Form.Label>CreatedBy</Form.Label>
          <Form.Control type="text" value={this.state.createdBy} onChange={this.onChangeTaskCreatedBy} />
        </Form.Group>

        <Form.Group controlId="AssignedTo">
          <Form.Label>AssignedTo</Form.Label>
          <Form.Control type="text" value={this.state.assignedTo} onChange={this.onChangeTaskAssignedTo} />
        </Form.Group>

        <Form.Group controlId="IsCompleted">
          <Form.Label>Is Completed</Form.Label>
          <Form.Control type="boolean" value={this.state.isCompleted} onChange={this.onChangeTaskIsCompleted} />
        </Form.Group>

        <Form.Group controlId="DueDate">
          <Form.Label>DueDate</Form.Label>
          <Form.Control type="date" value={this.state.dueDate} onChange={this.onChangeTaskDueDate} />
        </Form.Group>

        <Form.Group controlId="CompletedAt">
          <Form.Label>CompletedAt</Form.Label>
          <Form.Control type="date" value={this.state.completedAt} onChange={this.onChangeTaskCompletedAt} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update Task
          </Button>{' '}
          <Button variant="secondary" size="sm" type="reset">
            Cancel
          </Button>
        </div>

      </Form>
    </div>
    </div>
    </div>
    );
  }
}