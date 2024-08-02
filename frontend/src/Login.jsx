import { React, useState } from "react";
import axios from "axios";
import "./Login.css";

export const Login = () => {
    const [UserID, setUserID] = useState("");
    const [Password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(UserID, Password);
        try {
            console.log("calling api");
            
            let data = await axios.post("http://localhost:3000/getTodos", {
                UserID,
                Password,
            });
            console.log(data.data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <div>Welcome to Todos</div>
            <form>
                <div className="form">
                    <label>UserID : </label>
                    <input
                        type="text"
                        onChange={(e) => setUserID(e.target.value)}
                    />
                    <label htmlFor="password">password : </label>
                    <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Submit</button>
                </div>
            </form>
        </>
    );
};
