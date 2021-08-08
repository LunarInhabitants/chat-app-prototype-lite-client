import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ChatBox from "./ChatBox";
import "./App.css";

const client = new W3CWebSocket("ws://127.0.0.1:8081");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatEvents: [],
      inputText: "",
    };
  }

  componentWillMount() {
    client.onopen = () => {
      client.send(
        JSON.stringify({
          type: "startConnection",
          content: "React Lite Client",
        })
      );
    };
    client.onmessage = (message) => {
      let data = JSON.parse(message.data);
      if (data.type === "viewMessages") {
        this.setState({ chatEvents: JSON.parse(data.content) });
      } else if (data.type === "createMessage") {
        let newChats = this.state.chatEvents;
        newChats.push(data.content);
        this.setState({ chatEvents: newChats });
      }
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      client.send(
        JSON.stringify({
          type: "createMessage",
          content: { text: e.target.value },
        })
      );
      this.setState({ inputText: "" });
    } else {
      this.setState({ inputText: e.target.value });
    }
  }

  render() {
    return (
      <div class="row">
        <div class="column">
          <NumberList chatEvents={this.state.chatEvents} />
        </div>
        <div class="column">
          <ChatBox
            text={this.state.inputText}
            handleTextChange={this.handleTextChange}
          />
        </div>
      </div>
    );
  }
}

function NumberList(props) {
  const chatEvents = props.chatEvents;
  if (chatEvents.length) {
    const listItems = chatEvents.map((chatEvent) => (
      <div class="chat-line">
        {new Intl.DateTimeFormat("en-GB", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(Date.parse(chatEvent.date))}
        {" - "}
        {chatEvent.text}
      </div>
    ));

    return <div>{listItems}</div>;
  } else {
    return <div>No messages yet</div>;
  }
}

export default App;
