import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctUsername: true,
      username: ""
    };

    this.logIn = this.logIn.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  logIn(e) {
    e.preventDefault();

    const regex = /^[\s\wÅÄÖåäö-]{1,12}$/;

    //check username
    if (regex.test(this.state.username)) {
      this.setState({
        correctUsername: true
      });
      this.props.login(this.state.username);
    } else {
      this.setState({
        correctUsername: false
      });
    }
  }

  setUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    return (
      <div className="login-page-container">
        <header className="app-header">
          <h1>Welcome!</h1>
        </header>
        <main className="app-main">
          <form className="login-form" onSubmit={this.logIn}>
            <h2>Write your username!</h2>
            <input
              id="username"
              type="text"
              required="required"
              placeholder="Username..."
              onChange={this.setUsername}
            />

            {//if username isn't in correct format, than display alert message
            !this.state.correctUsername ? (
              <p className="login-incorrect-username">
                Username must be between 1 to 12 characters and can contain only
                letters, numbers, spaces and symbols('-' '_')
              </p>
            ) : null}

            <input className="login-submit" type="submit" value="Sign in" />
          </form>
        </main>
      </div>
    );
  }
}

export default LoginPage;
