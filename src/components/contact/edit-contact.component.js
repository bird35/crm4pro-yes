import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditContact extends Component {

  constructor(props) {
    super(props)

    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeContactTitle = this.onChangeContactTitle.bind(this);
    this.onChangeContactOrganization = this.onChangeContactOrganization.bind(this);
    this.onChangeContactDepartment = this.onChangeContactDepartment.bind(this);
    this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
    this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
    this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
    this.onChangeContactWebsite = this.onChangeContactWebsite.bind(this);
    this.onChangeContactSource = this.onChangeContactSource.bind(this);
    this.onChangeContactState = this.onChangeContactState.bind(this);
    this.onChangeContactCreatedAt = this.onChangeContactCreatedAt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
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
      createdAt: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/contacts/edit-contact/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          Name: res.data.username,
          name: res.data.name,
          title: res.data.title,
          organization: res.data.organization,
          department: res.data.department,
          email: res.data.email,
          address: res.data.address,     
          phone: res.data.phone,
          website: res.data.website,
          source: res.data.source,
          state: res.data.state,
          createdAt: res.data.createdAt
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeContactName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeContactTitle(e) {
    this.setState({ title: e.target.value })
  }

  onChangeContactOrganization(e) {
    this.setState({ organization: e.target.value })
  }

  onChangeContactDepartment(e) {
    this.setState({ department: e.target.value })
  }

  onChangeContactEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeContactAddress(e) {
    this.setState({ address: e.target.value })
  }

  onChangeContactPhone(e) {
    this.setState({ phone: e.target.value })
  }

  onChangeContactWebsite(e) {
    this.setState({ website: e.target.value })
  }

  onChangeContactSource(e) {
    this.setState({ source: e.target.value })
  }

  onChangeContactState(e) {
    this.setState({ state: e.target.value })
  }

  onChangeContactCreatedAt(e) {
    this.setState({ createdAt: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

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

    axios.put('http://localhost:4000/contacts/update-contact/' + this.props.match.params._id, contactObject)
      .then((res) => {
        console.log(res.data)
        console.log('Contact successfully updated')
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

        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeContactName} />
        </Form.Group>

        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeContactTitle} />
        </Form.Group>

        <Form.Group controlId="Organization">
          <Form.Label>Organization</Form.Label>
          <Form.Control type="text" value={this.state.organization} onChange={this.onChangeContactOrganization} />
        </Form.Group>

        <Form.Group controlId="Department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={this.state.department} onChange={this.onChangeContactDepartment} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeContactEmail} />
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeContactAddress} />
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangeContactPhone} />
        </Form.Group>

        <Form.Group controlId="Website">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" value={this.state.website} onChange={this.onChangeContactWebsite} />
        </Form.Group>

        <Form.Group controlId="Source">
          <Form.Label>Source</Form.Label>
          <Form.Control type="text" value={this.state.source} onChange={this.onChangeContactSource} />
        </Form.Group>

        <Form.Group controlId="State">
          <Form.Label>Start</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={this.onChangeContactState} />
        </Form.Group>

        <Form.Group controlId="CreatedAt">
          <Form.Label>CreatedAt</Form.Label>
          <Form.Control type="date" value={this.state.createdAt} onChange={this.onChangeContactCreatedAt} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update Contact
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