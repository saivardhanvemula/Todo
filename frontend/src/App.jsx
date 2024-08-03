import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { Login } from "./Login";
import "./App.css";
import { TodosProvider } from "./TodosContext";

function App() {
  return (
    <TodosProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </TodosProvider>
  );
}

export default App;
