import Register from "./components/auth-components/register";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/auth-components/login";

// import { io } from "socket.io-client";
// const socket = io();
// socket.on("hello", (message) => console.log(message));

export default function Welcome() {
    return (
        <div className="welcome-container">
            <h1>GO FUND YOURSELF</h1>
            <br></br>
            <h3>The place where artists can manage their grants & funding</h3>
            <br></br>
            <img className="bg-img-modal" src="/blur-background.svg" alt="" />
 
            <BrowserRouter>
                <div className="welcome-box">
                    <Route exact path="/">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}