import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctUsername: true
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn(e) {
    e.preventDefault();

    const regex = /^[\w-]+$/;
    const username = document.querySelector("#username").value;

    //check username
    if (regex.test(username)) {
      this.setState({
        correctUsername: true
      });
      this.props.login(username);
    } else {
      this.setState({
        correctUsername: false
      });
    }
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
              minLength={1}
              maxLength={12}
              placeholder="Username..."
            />

            {//if username isn't in correct format, than display alert message
            !this.state.correctUsername ? (
              <p className="login-incorrect-username">
                Username can contain only letters, numbers and symbols('-' '_')
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
