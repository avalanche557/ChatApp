import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'

import './messages.css';
import Message from '../message/message';

const Messages = ({messages, name}) => {
    return(
       <ScrollToBottom  className="messages">
           {messages.map((message, index) => <div key={index}><Message message={message} name={name}/></div>)}
       </ScrollToBottom>
    )
}



export default Messages; 