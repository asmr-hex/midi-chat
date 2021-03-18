import React from 'react'
import './App.css'
import { MidiProvider } from './state/midi'
import { InputDevices } from './midi/input'

function App() {
    return (
        <MidiProvider>
            <div className="App">
                cool
                <InputDevices />
            </div>
        </MidiProvider>
    )
}

export default App
