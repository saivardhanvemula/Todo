import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

export const Login = () => {
    const [UserID, setUserID] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(UserID, Password);
        try {
            console.log("calling api");

            let data = await axios.post("http://localhost:3000/login", {
                UserID,
                Password,
            });
            // console.log(data.status);
            if (data.status == 200) {
                localStorage.setItem("UserID", UserID);
                setUser({ UserID: UserID });
                navigate("/home");
            }
            // console.log(data.data.data)
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("UserID")) {
            navigate("/home");
        }
    }, []);

    return (
        <>
            <div>Welcome to Todos</div>
            <form>
                <div className="form">
                    <label htmlFor="userID">UserID : </label>
                    <input
                        id="userID"
                        type="text"
                        onChange={(e) => setUserID(e.target.value)}
                        placeholder="Enter your UseID"
                        autoComplete="username"
                    />
                    <label htmlFor="password">password : </label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your Password"
                        autoComplete="current-password"
                    />
                    <button onClick={handleLogin}>Submit</button>
                </div>
            </form>
        </>
    );
};
