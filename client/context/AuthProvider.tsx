"use client"
import React, { createContext, useContext } from 'react'

export const AuthContext = createContext({});

function AuthProvider({user, children}) {
  return <AuthContext.Provider value={{user}}>
    {children}
  </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthProvider