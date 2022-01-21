import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditLead extends Component {

  constructor(props) {
    super(props)

    this.onChangeLeadName = this.onChangeLeadName.bind(this);
    this.onChangeLeadTitle = this.onChangeLeadTitle.bind(this);
    this.onChangeLeadOrganization = this.onChangeLeadOrganization.bind(this);
    this.onChangeLeadDepartment = this.onChangeLeadDepartment.bind(this);
    this.onChangeLeadEmail = this.onChangeLeadEmail.bind(this);
    this.onChangeLeadAddress = this.onChangeLeadAddress.bind(this);
    this.onChangeLeadPhone = this.onChangeLeadPhone.bind(this);
    this.onChangeLeadWebsite = this.onChangeLeadWebsite.bind(this);
    this.onChangeLeadSource = this.onChangeLeadSource.bind(this);
    this.onChangeLeadState = this.onChangeLeadState.bind(this);
    this.onChangeLeadCreatedAt = this.onChangeLeadCreatedAt.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: '',
      title: '',
      organization: '',
      department: '',
      account: '',
      description: '',
      nocall: '',
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
    axios.get('http://localhost:4000/leads/edit-lead/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          Name: res.data.username,
          name: res.data.name,
          title: res.data.title,
          organization: res.data.organization,
          department: res.data.department,
          account: res.data.account,
          description: res.data.description,
          noCall: res.data.noCall,
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

  onChangeLeadName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeLeadTitle(e) {
    this.setState({ title: e.target.value })
  }

  onChangeLeadOrganization(e) {
    this.setState({ organization: e.target.value })
  }

  onChangeLeadDepartment(e) {
    this.setState({ department: e.target.value })
  }

  onChangeLeadAccount(e) {
    this.setState({ account: e.target.value })
  }

  onChangeLeadDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeLeadNoCall(e) {
    this.setState({ noCall: e.target.value })
  }

  onChangeLeadEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeLeadAddress(e) {
    this.setState({ address: e.target.value })
  }

  onChangeLeadPhone(e) {
    this.setState({ phone: e.target.value })
  }

  onChangeLeadWebsite(e) {
    this.setState({ website: e.target.value })
  }

  onChangeLeadSource(e) {
    this.setState({ source: e.target.value })
  }

  onChangeLeadState(e) {
    this.setState({ state: e.target.value })
  }

  onChangeLeadCreatedAt(e) {
    this.setState({ createdAt: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const leadObject = {
      name: this.state.name,
            title: this.state.title,
            organization: this.state.organization,
            department: this.state.department,
            account: this.state.account,
            description: this.state.description,
            nocall: this.state.nocall,
            email: this.state.email,
            address: this.state.address,     
            phone: this.state.phone,
            website: this.state.website,
            source: this.state.source,
            state: this.state.state,
            createdAt: this.state.createdAt
    };

    axios.put('http://localhost:4000/leads/update-lead/' + this.props.match.params._id, leadObject)
      .then((res) => {
        console.log(res.data)
        console.log('Lead successfully updated')
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
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeLeadName} />
        </Form.Group>

        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeLeadTitle} />
        </Form.Group>

        <Form.Group controlId="Organization">
          <Form.Label>Organization</Form.Label>
          <Form.Control type="text" value={this.state.organization} onChange={this.onChangeLeadOrganization} />
        </Form.Group>

        <Form.Group controlId="Department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={this.state.department} onChange={this.onChangeLeadDepartment} />
        </Form.Group>

        <Form.Group controlId="Account">
          <Form.Label>Account</Form.Label>
          <Form.Control type="text" value={this.state.account} onChange={this.onChangeLeadAccount} />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeLeadDescription} />
        </Form.Group>

        <Form.Group controlId="NoCall">
          <Form.Label>NoCall</Form.Label>
          <Form.Control type="text" value={this.state.noCall} onChange={this.onChangeLeadNoCall} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeLeadEmail} />
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeLeadAddress} />
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangeLeadPhone} />
        </Form.Group>

        <Form.Group controlId="Website">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" value={this.state.website} onChange={this.onChangeLeadWebsite} />
        </Form.Group>

        <Form.Group controlId="Source">
          <Form.Label>Source</Form.Label>
          <Form.Control type="text" value={this.state.source} onChange={this.onChangeLeadSource} />
        </Form.Group>

        <Form.Group controlId="State">
          <Form.Label>Start</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={this.onChangeLeadState} />
        </Form.Group>

        <Form.Group controlId="CreatedAt">
          <Form.Label>CreatedAt</Form.Label>
          <Form.Control type="date" value={this.state.createdAt} onChange={this.onChangeLeadCreatedAt} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update Lead
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