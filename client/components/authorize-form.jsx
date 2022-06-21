import React from 'react';

export default class AuthorizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'DummyUser1',
      password: 'DummyUser1Pass'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const dummyUsername = 'DummyUser1';
    const dummyPassword = 'DummyUser1Pass';
    const alternateActionHref = action === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const alternatActionText = action === 'sign-up'
      ? 'Sign in instead'
      : 'Register now';
    const submitButtonText = action === 'sign-up'
      ? 'Register'
      : 'Log In';
    return (
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className='d-flex justify-content-between'>
            <i className="fa-solid fa-user username"></i>
            <input
              required
              autoFocus
              id="username"
              type="text"
              name="username"
              defaultValue={dummyUsername}
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className='d-flex justify-content-between'>
            <i className="fa-solid fa-key username"></i>
            <input
              required
              id="password"
              type="password"
              name="password"
              defaultValue={dummyPassword}
              onChange={handleChange}
              className="form-control bg-light" />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <small>
            <a className="text-muted" href={alternateActionHref}>
              {alternatActionText}
            </a>
          </small>
          <button type="submit" className="btn btn-dark">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}
