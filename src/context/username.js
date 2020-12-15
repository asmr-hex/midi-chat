import React, { createContext, useContext, useState } from 'react'


const UsernameContext = createContext()

export const useUsernameContext = () => {
  const ctx = useContext(UsernameContext)
  if (ctx === undefined) {
    throw new Error(`useUsernameContext must be invoked in a child component of UsernameProvider`)
  }
  return ctx
}


export const UsernameProvider = props => {
  const [username, setUsername] = useState(null)

  const context = {
    username,
    setUsername,
  }
  
  return (
    <UsernameContext.Provider value={context}>
      {props.children}
    </UsernameContext.Provider>
  )
}
