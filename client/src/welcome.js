// import Registration from "./components/registration-components/registration";
// import Reset from "./components/auth-components/reset";
// import { BrowserRouter, Route } from "react-router-dom";
// import Login from "./components/auth-components/login";
// import MyChart from "./myChart";

// import { io } from "socket.io-client";
// const socket = io();

// // sends message to server console
// socket.on("hello", (message) => console.log(message));

export default function Welcome() {
    return (
        <div>
            <h1>Go Fund Yourself</h1>

            {/* <img id="app-logo-landing-page" src="/logo.svg" /> */}
            {/* <BrowserRouter>
                <div className="welcome-box">
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/reset">
                        <Reset />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter> */}
        </div>
    );
}

{/* <MyChart /> */}