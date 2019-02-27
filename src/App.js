import io from "socket.io-client";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedin: false,
      username: ""
    };

    this.signIn = this.signIn.bind(this);
  }

  signIn(e) {
    this.setState({
      signedin: true,
      username: document.querySelector("#username").value
    });
  }

  render() {
    if (!this.state.signedin) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Welcome!</h1>
          </header>
          <main className="App-main">
            <form>
              <input
                id="username"
                type="text"
                required="required"
                minLength={1}
                maxLength={12}
                placeholder="Username..."
              />
              <input type="submit" onClick={this.signIn} value="Sign in" />
            </form>
          </main>
        </div>
      );
    } else {
      const socket = io(
        "http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000"
      );
      let messages;
      socket.on("messages", function(data) {
        messages = data.map((message) =>
          <div>{message}</div>
        );
      });

      const text = `Welcome, ${this.state.username}!`;

      return (
        <div className="App">
          <header className="App-header">
            <h1>{text}</h1>
          </header>
          <main className="App-main">
            <div className="Messages">
              {messages}
            </div>
            <div className="New-message"></div>
          </main>
        </div>
      );
    }
  }
}

export default App;
