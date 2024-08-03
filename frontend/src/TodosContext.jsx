// TodosContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const TodosContext = createContext();

// Provider component
function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}

// Custom hook to use the Todos context
function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }
  return context;
}

export { TodosProvider, useTodos };
