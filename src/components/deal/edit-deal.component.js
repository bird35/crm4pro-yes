import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditDeal extends Component {

  constructor(props) {
    super(props)

    this.onChangeDealName = this.onChangeDealName.bind(this);
    this.onChangeDealTitle = this.onChangeDealTitle.bind(this);
    this.onChangeDealOrganization = this.onChangeDealOrganization.bind(this);
    this.onChangeDealDepartment = this.onChangeDealDepartment.bind(this);
    this.onChangeDealEmail = this.onChangeDealEmail.bind(this);
    this.onChangeDealAddress = this.onChangeDealAddress.bind(this);
    this.onChangeDealPhone = this.onChangeDealPhone.bind(this);
    this.onChangeDealWebsite = this.onChangeDealWebsite.bind(this);
    this.onChangeDealSource = this.onChangeDealSource.bind(this);
    this.onChangeDealState = this.onChangeDealState.bind(this);
    this.onChangeDealCreatedAt = this.onChangeDealCreatedAt.bind(this);
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
    axios.get('http://localhost:4000/deals/edit-deal/' + this.props.match.params._id)
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

  onChangeDealName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeDealTitle(e) {
    this.setState({ title: e.target.value })
  }

  onChangeDealOrganization(e) {
    this.setState({ organization: e.target.value })
  }

  onChangeDealDepartment(e) {
    this.setState({ department: e.target.value })
  }

  onChangeDealAccount(e) {
    this.setState({ account: e.target.value })
  }

  onChangeDealDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeDealNoCall(e) {
    this.setState({ noCall: e.target.value })
  }

  onChangeDealEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeDealAddress(e) {
    this.setState({ address: e.target.value })
  }

  onChangeDealPhone(e) {
    this.setState({ phone: e.target.value })
  }

  onChangeDealWebsite(e) {
    this.setState({ website: e.target.value })
  }

  onChangeDealSource(e) {
    this.setState({ source: e.target.value })
  }

  onChangeDealState(e) {
    this.setState({ state: e.target.value })
  }

  onChangeDealCreatedAt(e) {
    this.setState({ createdAt: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const dealObject = {
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

    axios.put('http://localhost:4000/deads/update-deal/' + this.props.match.params._id, dealObject)
      .then((res) => {
        console.log(res.data)
        console.log('Deal successfully updated')
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
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeDealName} />
        </Form.Group>

        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeDealTitle} />
        </Form.Group>

        <Form.Group controlId="Organization">
          <Form.Label>Organization</Form.Label>
          <Form.Control type="text" value={this.state.organization} onChange={this.onChangeDealOrganization} />
        </Form.Group>

        <Form.Group controlId="Department">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={this.state.department} onChange={this.onChangeDealDepartment} />
        </Form.Group>

        <Form.Group controlId="Account">
          <Form.Label>Account</Form.Label>
          <Form.Control type="text" value={this.state.account} onChange={this.onChangeDealAccount} />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeDealDescription} />
        </Form.Group>

        <Form.Group controlId="NoCall">
          <Form.Label>NoCall</Form.Label>
          <Form.Control type="text" value={this.state.noCall} onChange={this.onChangeDealNoCall} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeDealEmail} />
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.address} onChange={this.onChangeDealAddress} />
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>phone</Form.Label>
          <Form.Control type="text" value={this.state.phone} onChange={this.onChangeDealPhone} />
        </Form.Group>

        <Form.Group controlId="Website">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" value={this.state.website} onChange={this.onChangeDealWebsite} />
        </Form.Group>

        <Form.Group controlId="Source">
          <Form.Label>Source</Form.Label>
          <Form.Control type="text" value={this.state.source} onChange={this.onChangeDealSource} />
        </Form.Group>

        <Form.Group controlId="State">
          <Form.Label>Start</Form.Label>
          <Form.Control type="text" value={this.state.state} onChange={this.onChangeDealState} />
        </Form.Group>

        <Form.Group controlId="CreatedAt">
          <Form.Label>CreatedAt</Form.Label>
          <Form.Control type="date" value={this.state.createdAt} onChange={this.onChangeDealCreatedAt} />
        </Form.Group>

        <div>
          <Button variant="success" size="sm" type="submit">
            Update Deal
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