import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

//import { Table } from 'semantic-ui-react'

export default class EditUser extends Component {

  constructor(props) {
    super(props)

    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/edit-user/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          email: res.data.email,
          password: res.data.password
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUserEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeUserPassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      email: this.state.email,
      password: this.state.password
    };

    axios.put('http://localhost:4000/users/update-user/' + this.props.match.params._id, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
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

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeUserEmail} />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" value={this.state.password} onChange={this.onChangeUserPassword} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update User
          </Button>{' '}
          <Button variant="secondary" size="sm" type="reset">
            Cancel
          </Button>
        </div>
      
      </Form>
      </div>
      </div>
      </div>
    )}
}