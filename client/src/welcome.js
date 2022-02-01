import Register from "./components/auth-components/register";
import Reset from "./components/auth-components/reset-pw";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/auth-components/login";
// import MyChart from "./myChart";

// import { io } from "socket.io-client";
// const socket = io();

// // sends message to server console
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

{/* <MyChart /> */}