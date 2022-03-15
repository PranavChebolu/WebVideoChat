import React from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidV4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import {k_home_route} from "../../App";

const VideoChat = (props) => {
    // function to navigate to new page
    const navigate = useNavigate();

    // reference to our socket handler (to send messages and other related socket functions)
    const [socketHandler, setSocketHandler] = React.useState(undefined);

    // message typed into text field by our user
    const [message, setMessage] = React.useState("");

    // list of chat messages
    const [chatMessages, setChatMessages] = React.useState([]);

    // our user
    const [user, setUser] = React.useState(undefined);

    // use effect hook - runs once like a constructor
    React.useEffect(() => {
        // exit if name is not valid
        if (!props.name || (props.name.trim().length === 0)) {
            navigate(k_home_route);
        }

        // connection to socket server
        const socket = socketIOClient('http://localhost:8081', { secure: false });

        // listen for chat messages
        socket.on('chat message', (newChatMessage) => {
            chatMessages.push(newChatMessage);
            const chatMessagesCopy = [...chatMessages];
            setChatMessages(chatMessagesCopy);
        });

        // set socket handler so we can do things like sending messages in the sendMessage() function
        setSocketHandler(socket);

        // set the user object
        setUser({
            name: props.name,
        });

        // clean up function to close socket connection when this component is removed from screen
        return () => {
            if (socketHandler) {
                socketHandler.close();
            }
        }
    }, []);

    // function to send a message to other clients by emitting a socket message
    const sendMessage = (message) => {
        // prevent empty message from being sent
        if (message || message.trim().length > 0) {
            if (socketHandler) {
                // define object to send to other clients
                const messageObj = {
                    id: uuidV4(),
                    user: user,
                    message: message
                };

                // print out what we are sending to other clients
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

    // html drawn to screen
    return (
        <div>
            <div>
                {
                    chatMessages.map((message) => {
                        return (
                            <div key={message.id} style={{ backgroundColor: "grey", margin: "10px", padding: "10px" }}>
                                <p style={{ color: "white" }}>{message.user.name}</p>
                                <p style={{ color: "white" }}>{message.message}</p>
                            </div>
                        );
                    })
                }
            </div>
            <input value={message} onChange={(event) => {
                setMessage(event.target.value);
            }} />
            <button onClick={() => { sendMessage(message) }}>Send Message</button>
        </div>
    );
}

export default VideoChat;
