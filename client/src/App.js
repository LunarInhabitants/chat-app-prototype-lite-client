import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import ChatBox from "./ChatBox";

const client = new W3CWebSocket("ws://127.0.0.1:8081");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ["Hello"],
      inputText: "",
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send(
        JSON.stringify({ type: "createMessage", content: "I came from js!" })
      );
    };
    client.onmessage = (message) => {
      let data = JSON.parse(message.data);
      if (data.type === "viewMessages") {
        console.log("All messages received");
        console.log(message);
        this.setState({ text: JSON.parse(data.content) });
      }
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      client.send(
        JSON.stringify({ type: "createMessage", content: "Text change" })
      );
    } else {
      this.setState({ inputText: e.target.value });
    }
  }

  render() {
    return (
      <div>
        <NumberList numbers={this.state.text} />
        <ChatBox
          text={this.state.inputText}
          handleTextChange={this.handleTextChange}
        />
      </div>
    );
  }
}

function NumberList(props) {
  const numbers = props.numbers;
  console.log(numbers);
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

export default App;
