import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8081');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ["Hello"]
    };
    
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      client.send(JSON.stringify({"type": "createMessage", "content": "I came from js!"}))
    };
    client.onmessage = (message) => {
      console.log(message);
      this.setState({text: JSON.parse(message.data)})
    };
  }
  
  render() {
    return (
      <div>
        <NumberList numbers={this.state.text} /> 
      </div>
    );
  }
}

function NumberList(props) {
  const numbers = props.numbers;
  console.log(numbers);
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default App;