import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import {v4 as uuidV4} from 'uuid';
import React from "react";

function App() {
  const [socketHandler, setSocketHandler] = React.useState(undefined);
  const [message, setMessage] = React.useState("");

  const [chatMessages, setChatMessages] = React.useState([
    {
      id: 'someId1',
      user: {
        name: 'Bob',
        // socketId: 'someSocketId'
      },
      message: 'sampleMessage'
    }
  ]);

  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const socket = socketIOClient('http://localhost:8081', {secure: false});

    setSocketHandler(socket);

    setUser({
      name: "Pranav",
      // socketId: socket.id
    });

    return () => {
      if (socketHandler) {
        socketHandler.close();
      }
    }
  }, []);

  // function to send a message
  const sendMessage = (message) => {
    // prevent empty message from being sent
    if (message || message.trim().length > 0) {
      if (socketHandler) {
        const messageObj = {
          id: uuidV4(),
          user: user,
          message: message
        };

        console.log('sending message object', messageObj);

        // emit message to socket server
        socketHandler.emit('chat message', messageObj);

        // clear text field after sending message
        setMessage('');
      } else {
        console.warn('socket handler not defined, unable to send message');
      }
    }
  }

  return (
    <div>
      <div>
        {
          chatMessages.map((message) => {
            return (
                <div key={message.id} style={{backgroundColor: "grey", margin: "10px"}}>
                  <p style={{color: "white"}}>{message.user.name}</p>
                  <p style={{color: "white"}}>{message.message}</p>
                </div>
            );
          })
        }
      </div>
      <input value={message} onChange={(event) => {
        setMessage(event.target.value);
      }}/>
      <button onClick={() => {sendMessage(message)}}>Send Message</button>
    </div>
  );
}

export default App;
