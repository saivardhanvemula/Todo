import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import add from "./assets/add.svg";

function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = async () => {
        if (title && description) {
            const newTodo = { title, description, completed: false };
            console.log(newTodo);
            if (todos.some((todo) => todo.title === newTodo.title)) {
                alert("The Todo already exists !");
            } else {
                setTodos([...todos, newTodo]);
                await axios.post("http://localhost:3000/addTodo", newTodo);
                setTitle("");
                setDescription("");
            }
        }
    };
    const getTodos = async () => {
        const response = await axios.get("http://localhost:3000/data");
        console.log(response.data);
        setTodos([...todos, ...response.data]);
    };
    useEffect(() => {
        getTodos();
    }, []);

    const toggleCompleted = async (index, title) => {
        const updatedTodos = todos.map((todo, idx) =>
            idx === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        await axios.post("http://localhost:3000/toggle", { title });
    };

    return (
        <>
            <h1>Todos</h1>
            <div className="new">
                <div className="details">
                    <div>
                        <label>Title : </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    </div>
                    <div>
                        <label>Description : </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                        />
                    </div>
                </div>
                <div className="addbtn">
                    <button onClick={handleAddTodo}>
                        <img src={add} alt="" />
                    </button>
                </div>
            </div>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div
                        key={index}
                        className={`todo ${
                            todo.completed ? "completed" : "notCompleted"
                        }`}
                    >
                        <h3>Title: {todo.title}</h3>
                        <p>Description: {todo.description}</p>
                        <button
                            onClick={() => toggleCompleted(index, todo.title)}
                        >
                            {todo.completed
                                ? "Mark as Incomplete"
                                : "Mark as Complete"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
