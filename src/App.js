import io from "socket.io-client";
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedin: true,
      username: "Yaro",
      messages: []
    };

    this.signIn = this.signIn.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.listener = io(
      "http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000"
    );

    this.listener.on("messages", data => {
      for (let message of data) {
        this.addMessage(message);
      }
    });

    this.listener.on("new_message", data => {
      this.addMessage(data);
    });

    this.writer = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000");
  }

  signIn(e) {
    this.setState({
      signedin: true,
      username: document.querySelector("#username").value
    });
    document.querySelector("#username").value = "";
  }

  addMessage(obj) {
    this.setState({
      messages: [...this.state.messages, obj]
    });
  }

  sendMessage() {
    const message = {
      username: this.state.username,
      content: document.querySelector("#new-message__content").value
    };
    this.writer.emit("message", message);
  }

  render() {
    if (!this.state.signedin) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Welcome!</h1>
          </header>
          <main className="App-main">
            <input
              id="username"
              type="text"
              required="required"
              minLength={1}
              maxLength={12}
              placeholder="Username..."
            />
            <input type="submit" onClick={this.signIn} value="Sign in" />
          </main>
        </div>
      );
    } else {
      const text = `Welcome, ${this.state.username}!`;

      return (
        <div className="app">
          <header className="app-header">
            <h1>{text}</h1>
          </header>
          <main className="app-main">
            <div className="main__messages">
              {this.state.messages.map(obj => {
                return (
                  <div className="message" key={obj.id}>
                    <h3 className="message__username">{obj.username}</h3>
                    <p className="message__content">{obj.content}</p>
                  </div>
                );
              })}
            </div>
            <div className="new-message-container">
              <textarea
                id="new-message__content"
                minLength={1}
                maxLength={200}
              />
              <button className="new-message__send" onClick={this.sendMessage}>
                Send
              </button>
            </div>
          </main>
        </div>
      );
    }
  }
}

export default App;
