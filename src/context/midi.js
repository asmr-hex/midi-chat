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
  const [consumeMidi, setConsumeMidi] = useState(null)
  const [broadcastMidi, setBroadcastMidi] = useState(null)
  
  const [availableMidiInputs, setAvailableMidiInputs] = useState(null)
  const [availableRemoteMidiInputs, setAvailableRemoteMidiInputs] = useState(null)
  const [availableMidiOutputs, setAvailableMidiOutputs] = useState(null)
  const [selectedMidiInputs, setSelectedMidiInputs] = useState(null)
  const [selectedRemoteMidiInputs, setSelectedRemoteMidiInputs] = useState(null)
  const [selectedMidiOutputs, setSelectedMidiOutputs] = useState(null)

  useEffect(() => {
    navigator.requestMIDIAccess()
      .then(
        access => {
          setMidiAccess(access) 
        },
        err => console.error(err),
      )
  }, [])

  useEffect(() => {
    
  }, [selectedMidiInputs])
  
  const context = {
    midiAccess,
    consumeMidi,
    setBroadcastMidi,
  }
  
  return (
    <MidiContext.Provider value={context}>
      { midiAccess === null ? null : props.children }
    </MidiContext.Provider>
  )
}



