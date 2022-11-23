import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';

const socket = io.connect('http://localhost:3000')

function App() {
    const [state, setState] = useState({ message: '', name: '' })
    const [chat, setChat] = useState([])

useEffect(() => {
    socket.on('message', ({ name, message }) => {
        setChat([...chat, { name, message }])
    })
}, [])

const renderChat = () => {
    return chat.map(({ name, message }, index) => (
        <div key={index}>
            <h3>{name}:<span>{message}</span></h3>
        </div>
    ))
}

return (
    <div className='card'>
        <div className="render-chat">
            <h1>Chat log</h1>
            {renderChat()}
        </div>
    </div>
);
}

export default App;