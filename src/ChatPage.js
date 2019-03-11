import React, { Component } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Emojify from "react-emojione";

import Message from "./Message";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(e) {
    e.preventDefault();
    const textField = document.querySelector("#new-message__content");
    this.props.sendmessage(textField.value);
    textField.value = "";
  }

  addEmoji(e) {
    const textField = document.querySelector("#new-message__content");
    textField.value += e.target.title;
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
            return (
              <Message
                key={obj.id}
                message={obj}
                username={this.props.username}
              />
            );
          })}
        </ScrollToBottom>
        <form className="new-message-container" onSubmit={this.sendMessage}>
          <input id="new-message__content" minLength={1} maxLength={200} />
          <div className="emoji">
            <Emojify style={{ height: 18, width: 18 }} onClick={this.addEmoji}>
              :joy::heart::heart_eyes::thinking::fire::slight_smile::rofl::kissing_heart::hugging::cookie:
            </Emojify>
          </div>
          <input type="submit" className="new-message__send" value="Send" />
        </form>
      </div>
    );
  }
}

export default ChatPage;
