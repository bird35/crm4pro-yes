import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditAccount extends Component {

  constructor(props) {
    super(props)

    this.onChangeAccountAccountname = this.onChangeAccountAccountname.bind(this);
    this.onChangeAccountEmail = this.onChangeAccountEmail.bind(this);
    this.onChangeAccountPassword = this.onChangeAccountPassword.bind(this);
    this.onChangeAccountCreatedAt = this.onChangeAccountCreatedAt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      accountname: '',
      email: '',
      password: '',
      createdAt: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/accounts/edit-account/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          assignee: res.data.assignee,
          contactPerson: res.data.contactPerson,
          name: res.data.name,
          industry: res.data.industry,
          address: res.data.address,
          state: res.data.state,
          email: res.data.email,
          phone: res.data.phone,
          createdAt: res.data.createdAt
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeAccountAccountname(e) {
    this.setState({ accountname: e.target.value })
  }

  onChangeAccountEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeAccountPassword(e) {
    this.setState({ password: e.target.value })
  }

  onChangeAccountCreatedAt(e) {
    this.setState({ createdAt: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const accountObject = {
      assignee: this.state.assignee,
      contactPerson: this.state.contactPerson,
      name: this.state.name,
      industry: this.state.industry,
      address: this.state.address,
      state: this.state.state,
      email: this.state.email,
      phone: this.state.phone,
      createdAt: this.state.createdAt
    };

    axios.put('http://localhost:4000/accounts/update-account/' + this.props.match.params._id, accountObject)
      .then((res) => {
        console.log(res.data)
        console.log('Account successfully updated')
      }).catch((error) => {
        console.log(error)
      })

      this.setState({ subject: '', description: '', createdBy: '', assignedTo: '', isCompleted: '', isPending: '', createdAt: '', dueDate: '', completedAt: '' })

      // Redirect to task List 
     this.props.history.push('/success-alert')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Assignee">
          <Form.Label>Assignee</Form.Label>
          <Form.Control type="text" value={this.state.assignee} onChange={this.onChangeAccountAssignee} />
        </Form.Group>

        <Form.Group controlId="ContactPerson">
          <Form.Label>ContactPerson</Form.Label>
          <Form.Control type="text" value={this.state.contactPerson} onChange={this.onChangeAccountContactPerson} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeAccountName} />
        </Form.Group>

        <Form.Group controlId="Industry">
          <Form.Label>Industry</Form.Label>
          <Form.Control type="text" value={this.state.industry} onChange={this.onChangeAccountIndustry} />
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeAccountAddress} />
        </Form.Group>

        <Form.Group controlId="State">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={this.onChangeAccountState} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeAccountEmail} />
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangeAccountPhone} />
        </Form.Group>

        <Form.Group controlId="CreatedAt">
          <Form.Label>CreatedAt</Form.Label>
          <Form.Control type="date" value={this.state.createdAt} onChange={this.onChangeAccountCreatedAt} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update Account
          </Button>{' '}
          <Button href="/account-list/" variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </Form>
    </div>);
  }
}