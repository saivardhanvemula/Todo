// TodosContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Provider component
function UserProvider({ children }) {
  const [User, setUser] = useState({});

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the Todos context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
}

export { UserProvider, useUser };
