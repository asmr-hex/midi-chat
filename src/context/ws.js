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
  const { midiAccess, consumeMidi, setBroadcastMidi } = useMidiContext()
  const { username, sessionId, updateUsers } = useUsernameContext()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8081/${sessionId}/${username}`) // TODO change url

    ws.onopen = () => {
      console.log("connected.")
    }
    ws.onmessage = m => {
      const msg = JSON.parse(m.data)
      switch (msg.type) {
      case 'MIDI':
        consumeMidi(msg)
        break
      case 'USER_REGISTRATION':
        updateUsers(msg)
        break
      default:
        // ummm
      }
    }

    // set the broadCast midi function for use in midi onevent handler
    setBroadcastMidi(midiMsg => ws.send({
      type: 'MIDI',
      user: username,
      room: sessionId,
      data: midiMsg,
    }))
    
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


