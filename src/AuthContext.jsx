import React, { createContext, useState, useEffect } from 'react';//imported react hooks

export const AuthContext = createContext();// allows to share authentication state

export const AuthProvider = ({ children }) => {   //allows to wrap with authentication context
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user'); //gets user from local storage 
    return storedUser ? JSON.parse(storedUser) : null; // parses JSON to object
  });

  useEffect(() => { // runs everytime state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // if logged stores info
    } else {
      localStorage.removeItem('user'); //if logout removes
    }
  }, [user]); // runs when user changes

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
