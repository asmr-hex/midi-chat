import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { useUsernameContext } from './context/username'
import { WsProvider } from './context/ws'


const SetUsername = props => {
  const { setSessionId, setUsername } = useUsernameContext()
  const [newUsername, setNewUsername] = useState('')
  const { sessionId } = useParams()

  useEffect(() => {
    setSessionId(sessionId)
  }, [])

  
  const onChange = e => {
    setNewUsername(e.target.value)
  }

  const onClick = e => {
    setUsername(newUsername)
  }
  
  return (
    <div>
      <input
        onChange={onChange}
      />
      <input
        type="button"
        value="make username"
        onClick={onClick}
      />
    </div>
  )
}

// generate random room name with https://www.npmjs.com/package/random-words

const Main = props => {
  const { username } = props
  return (
    <WsProvider>
      <div>
        {username}
      </div>
    </WsProvider>
  )
}

function App() {
  const { username, sessionId, setUsername } = useUsernameContext()
  
  return (
    <div className="App">
      {
        username === null || sessionId === null ? <SetUsername/> : <Main username={username}/>
      }
    </div>
  );
}

export default App;
