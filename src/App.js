import io from "socket.io-client";
import React, { Component } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedin: false,
      username: "",
      messages: []
    };

    this.signIn = this.signIn.bind(this);
    this.logOut = this.logOut.bind(this);
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

    this.writer = io(
      "http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000"
    );
  }

  signIn(e) {
    e.preventDefault();
    this.setState({
      signedin: true,
      username: document.querySelector("#username").value
    });
  }

  logOut(){
    this.setState({
      signedin: false,
      username: ""
    });
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
    document.querySelector("#new-message__content").value = "";
  }

  render() {
    if (!this.state.signedin) {
      return (
        <div className="app">
          <header className="app-header">
            <h1>Welcome!</h1>
          </header>
          <main className="app-main">
            <form className="login-form" onSubmit={this.signIn}>
              <h2>Write your username!</h2>
              <input
                id="username"
                type="text"
                required="required"
                minLength={1}
                maxLength={12}
                placeholder="Username..."
              />
              <input type="submit" value="Sign in" />
            </form>
          </main>
        </div>
      );
    } else {
      const text = `Welcome, ${this.state.username}!`;

      return (
        <div className="app">
          <div className="app-header">
            <div></div>
            <h1>{text}</h1>
            <button className="log-out" onClick={this.logOut}>Log Out</button>
          </div>
          <ScrollToBottom className="app-main">
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
          </ScrollToBottom>
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
        </div>
      );
    }
  }
}

export default App;
