import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../../components/LoaderButton'
import './index.css'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })

    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
    } catch (e) {
      alert(e.message)
      console.log(e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} style={{ textAlign: 'center' }}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
          <Link to="/forgot" className="btn btn-lg">
            Forgot your password?
          </Link>
        </form>
      </div>
    )
  }
}
