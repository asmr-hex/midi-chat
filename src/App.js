import React, { useState } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { useUsernameContext } from './context/username'


const SetUsername = props => {
  const { setUsername } = props
  const [newUsername, setNewUsername] = useState('')

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
  const location = useLocation()
  console.log(location.pathname)
  const { username } = props
  return (
    <div>
      {username}
    </div>
  )
}

function App() {
  const { username, setUsername } = useUsernameContext()
  
  return (
    <Router>
      <div className="App">
        {
          username === null ? <SetUsername setUsername={setUsername}/> : <Main username={username}/>
        }
      </div>
    </Router>
  );
}

export default App;
