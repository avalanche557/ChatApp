import React, { useState, useEffect } from 'react';
import  queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

let socket ;


const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    //useEffect is smilar to componentDidMount and compnentDidUpdate
    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT)
        setName(name);
        setRoom(room)

        socket.emit('join', {name, room}, ({error}) => {
            alert(error);
        })

        return () => {
            socket.emit('disconect');
            socket.off();
        }
        
    // passing array, will only effect when the value of the element in the array change
    }, [ENDPOINT, location.search])
    return(
        <div>
            <p>
                chat
            </p>
        </div>
    )
}

export default Chat;