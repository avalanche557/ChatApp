import React, { useState, useEffect } from 'react';
import  queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

let socket ;


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    //array of message
    const [messages, setMessages] = useState([]);
    //for every single message
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';

    //useEffect is smilar to componentDidMount and compnentDidUpdate
    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT)
        setName(name);
        setRoom(room)

        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        })

        return () => {
            socket.emit('disconect');
            socket.off();
        }
        
    // passing array, will only effect when the value of the element in the array change
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    //function for sending message
    const sendMessage = (event) => {

        //this will prevent from whole page refresh on keypress
        //event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage('') );
        }
    }

    console.log(message, messages)

    return(
        <div className="outerContainer">
            <div className="container">
                <input 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                 <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
            </div>
        </div>
    )
}

export default Chat;