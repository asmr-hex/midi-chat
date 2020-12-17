import React, { createContext, useContext, useEffect, useState } from 'react'

import { useMidiContext } from './midi'
import { useUsernameContext } from './username'


const WsContext = createContext()

export const useWsContext = () => {
  const ctx = useContext(WsContext)
  if (ctx === undefined) {
    throw new Error(`useWsContext must be invoked in a child component of WsProvider`)
  }
  return ctx
}


export const WsProvider = props => {
  const { midiAccess } = useMidiContext()
  const { username, sessionId } = useUsernameContext()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8081/${sessionId}`) // TODO change url

    ws.onopen = () => {
      ws.send({type: 'register', user: username, room: sessionId})
    }
    ws.onmessage = m => console.log(m.data) // TODO use midi Access....

    setSocket(ws)
  }, [])
  
  const context = {
    send: msg => socket.send({...msg, user: username, room: sessionId})
  }
  
  return (
    <WsContext.Provider value={context}>
      { socket === null ? null : props.children }
    </WsContext.Provider>
  )
}


