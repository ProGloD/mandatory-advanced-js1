import React, { Component } from "react";
import Linkify from "react-linkify";
import Emojify from "react-emojione";

class Message extends Component {
  convertTime(timeInMilliseconds) {
    return new Date(timeInMilliseconds).toLocaleString();
  }

  checkContentForUrl() {}

  render() {
    const data = this.props.message;

    return (
      <div className="message">
        <h3 className="message__username">{data.username}</h3>
        <Linkify className="message__content">
          <Emojify style={{height: 24, width: 24}}>{data.content}</Emojify>
        </Linkify>
        <p className="message__time">{this.convertTime(data.timestamp)}</p>
      </div>
    );
  }
}

export default Message;
