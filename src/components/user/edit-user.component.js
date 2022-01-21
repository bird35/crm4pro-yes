import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class EditUser extends Component {

  constructor(props) {
    super(props)

    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onChangeUserActive = this.onChangeUserActive.bind(this);
    this.onChangeUserAdmin = this.onChangeUserAdmin.bind(this);
    this.onChangeUserSupervisor = this.onChangeUserSupervisor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = { 
      email: '',
      password: '',
      active: '',
      admin: '',
      supervisor: ''
    }
  
  }
  componentDidMount() {
    axios.get('http://localhost:4000/users/edit-user/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          email: res.data.email,
          password: res.data.password,
          active: res.data.active,
          admin: res.data.admin,
          supervisor: res.data.supervisor
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

  onChangeUserActive(e) {
    this.setState({ active: e.target.value })
  }

  onChangeUserAdmin(e) {
    this.setState({ admin: e.target.value })
  }

  onChangeUserSupervisor(e) {
    this.setState({ supervisor: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      email: this.state.email,
      password: this.state.password,
      active: this.state.active,
      admin: this.state.admin,
      supervisor: this.state.supervisor
    };

    axios.put('http://localhost:4000/users/update-user/' + this.props.match.params._id, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('User successfully updated')
      }).catch((error) => {
        console.log(error)
      })

      this.setState({ 
        email: '',
        password: '',
        active: '',
        admin: '',
        supervisor: ''
      });

      // Redirect to task List 
      this.props.history.push('/user-list')
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

        <Form.Group controlId="Active">
          <Form.Label>Active</Form.Label>
          <Form.Control as="select" value={this.state.active} onChange={this.onChangeUserActive}>
            <option>true</option>
            <option>false</option>
          </Form.Control>
        </Form.Group>
       
        <Form.Group controlId="Admin">
          <Form.Label>Admin</Form.Label>
          <Form.Control as="select" value={this.state.admin} onChange={this.onChangeUserAdmin}>
            <option>true</option>
            <option>false</option>
          </Form.Control>
        </Form.Group>
       
        <Form.Group controlId="Supervisor">
          <Form.Label>Supervisor</Form.Label>
          <Form.Control as="select" value={this.state.supervisor} onChange={this.onChangeUserSupervisor}>
            <option>true</option>
            <option>false</option>
          </Form.Control>
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit" onClick={() => { alert('User updated successfully') } }>
            Update User
          </Button>{' '}

          <Button variant="secondary" size="sm" type="reset" onClick={() => { alert('Form will reset')}}>
            Cancel
          </Button>
        </div>
      
      </Form>
      </div>
      </div>
      </div>
    )}
}

