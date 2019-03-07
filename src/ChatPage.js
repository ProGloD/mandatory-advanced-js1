import React, { Component } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    const textField = document.querySelector("#new-message__content");
    this.props.sendmessage(textField.value);
    textField.value = "";
  }

  render() {
    return (
      <div className="chat-page-container">
        <div className="app-header">
          <div />
          <h1>Welcome, {this.props.username}!</h1>
          <button className="log-out" onClick={this.props.logout}>
            Log Out
          </button>
        </div>
        <ScrollToBottom className="main__messages">
          {this.props.messages.map(obj => {
            return <Message key={obj.id} message={obj} />;
          })}
        </ScrollToBottom>
        <div className="new-message-container">
          <textarea id="new-message__content" minLength={1} maxLength={200} />
          <button className="new-message__send" onClick={this.sendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatPage;
