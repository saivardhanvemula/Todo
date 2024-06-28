import React, { useState } from 'react';
import "./App.css";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        if (title && description) {
            const newTodo = { title, description, completed: false };
            setTodos([...todos, newTodo]);
            setTitle("");
            setDescription("");
        }
    };

    const toggleCompleted = (index) => {
        const updatedTodos = todos.map((todo, idx) =>
            idx === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    return (
        <>
            <h1>Todos</h1>
            <div className="new">
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter title" 
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Enter description" 
                    />
                </div>
                <button onClick={handleAddTodo}>Add New Todo</button>
            </div>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div key={index} className={`todo ${todo.completed ? 'completed' : ''}`}>
                        <h3>Title: {todo.title}</h3>
                        <p>Description: {todo.description}</p>
                        <button onClick={() => toggleCompleted(index)}>
                            {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
