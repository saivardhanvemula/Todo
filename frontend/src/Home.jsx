import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import add from "./assets/add.svg";
import logout from "./assets/logout.svg";
import { useUser } from "./UserContext";

function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Todos, setTodos] = useState([]);
    const User = useUser();
    const navigate = useNavigate();
    // console.log(User.User.UserID)
    let UserID = localStorage.getItem("UserID") || User.User.UserID;
    console.log(UserID);
    const handleAddTodo = async () => {
        if (title && description) {
            const newTodo = { title, description, completed: false };
            console.log(newTodo);
            if (Todos.some((todo) => todo.title === newTodo.title)) {
                alert("The Todo already exists !");
            } else {
                setTodos([...Todos, newTodo]);
                await axios.post("http://localhost:3000/addTodo", newTodo);
                setTitle("");
                setDescription("");
            }
        }
    };
    const getTodos = async () => {
        const response = await axios.post("http://localhost:3000/getTodos", {
            UserID,
        });
        console.log(response.data);
        setTodos(response.data);
    };
    useEffect(() => {
        if(localStorage.getItem("UserID")){
            getTodos();
        }else{
            navigate("/")
        } 

    }, []);

    const toggleCompleted = async (index, title) => {
        const updatedTodos = Todos.map((todo, idx) =>
            idx === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        await axios.post("http://localhost:3000/toggle", { title });
    };
    const handleLogout = () => {
        if (confirm("Do you Want To Logout !")) {
            localStorage.removeItem("UserID");
            navigate("/");
        }
    };

    return (
        <>
            <h1>Todos of {UserID}</h1>
            <div className="logout">
                <button onClick={handleLogout}>
                    <img src={logout} alt="" />
                </button>
            </div>
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
                {Array.isArray(Todos) && Todos.length > 0 ? (
                    Todos.map((todo, index) => (
                        <div
                            key={index}
                            className={`todo ${
                                todo.completed ? "completed" : "notCompleted"
                            }`}
                        >
                            <h3>Title: {todo.title}</h3>
                            <p>Description: {todo.description}</p>
                            <button onClick={() => toggleCompleted(index)}>
                                {todo.completed
                                    ? "Mark as Incomplete"
                                    : "Mark as Complete"}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No Todos available</p>
                )}
            </div>
        </>
    );
}

export default Home;
