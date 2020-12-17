import React, { createContext, useContext, useEffect, useState } from 'react'
import 'web-midi-api'


const MidiContext = createContext()

export const useMidiContext = () => {
  const ctx = useContext(MidiContext)
  if (ctx === undefined) {
    throw new Error(`useMidiContext must be invoked in a child component of MidiProvider`)
  }
  return ctx
}


export const MidiProvider = props => {
  const [midiAccess, setMidiAccess] = useState(null)

  useEffect(() => {
    navigator.requestMIDIAccess()
      .then(
        access => setMidiAccess(access),
        err => console.error(err),
      )
  }, [])
  
  const context = { midiAccess }
  
  return (
    <MidiContext.Provider value={context}>
      { midiAccess === null ? null : props.children }
    </MidiContext.Provider>
  )
}



