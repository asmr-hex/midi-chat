import React from 'react'
import { useMidi } from '../state/midi'


export const InputDevices: React.FC<{}> = () => {
    const { access } = useMidi()

    if (access)
        console.log(access.inputs)

    return (
        <div>
            coolllll
        </div>
    )
}
