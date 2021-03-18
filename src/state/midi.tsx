import React, { createContext, useContext, useEffect, useState } from 'react'
import 'web-midi-api'


interface Context {
    access: WebMidi.MIDIAccess | null
}

const MidiContext = createContext<Context | null>(null)

export const useMidi = () => {
    const ctx = useContext(MidiContext) as Context
    if (ctx === undefined) {
        throw new Error(`useMidiContext must be invoked in a child component of MidiProvider`)
    }
    return ctx
}


export const MidiProvider: React.FC<{}> = ({ children }) => {
    const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null)
    // const [consumeMidi, setConsumeMidi] = useState(null)
    // const [broadcastMidi, setBroadcastMidi] = useState(null)

    // const [availableMidiInputs, setAvailableMidiInputs] = useState(null)
    // const [availableRemoteMidiInputs, setAvailableRemoteMidiInputs] = useState(null)
    // const [availableMidiOutputs, setAvailableMidiOutputs] = useState(null)
    // const [selectedMidiInputs, setSelectedMidiInputs] = useState(null)
    // const [selectedRemoteMidiInputs, setSelectedRemoteMidiInputs] = useState(null)
    // const [selectedMidiOutputs, setSelectedMidiOutputs] = useState(null)

    useEffect(() => {
        navigator.requestMIDIAccess()
            .then(
                access => setMidiAccess(access),
                err => console.error(err),
            )
    }, [])

    // useEffect(() => {

    // }, [selectedMidiInputs])

    const context: Context = {
        access: midiAccess,
    }

    return (
        <MidiContext.Provider value={context}>
            { midiAccess === null ? null : children}
        </MidiContext.Provider>
    )
}
