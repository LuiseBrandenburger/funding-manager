import { Link } from "react-router-dom";
import { Component } from "react";
import { useEffect, useState } from "react";
import useForm from "../../hooks/use-form";

export default function Login() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("login is mounted");
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("user wants to submit login data");

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((data) => {
                console.log("Data from handle Login: ", data);
                return data.json();
            })
            .then((data) => {
                console.log("response data from /login.json", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch login.json", err);
                setError(true);
            });
    }

    return (
        <div className="login-container">
            <h1>I am in Login Container</h1>

            <Link to="/">
                <button id="go-back-btn">GO BACK</button>
            </Link>
            <h1>You can login here: </h1>
            {error && (
                <h3 style={{ color: "red" }}> Error, something went wrong </h3>
            )}
            <form>
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="your@email.com"
                    type="email"
                />
                <input
                    onChange={handleChange}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <button onClick={handleLogin}>LOGIN</button>
            </form>
            <Link to="/reset">
                <button id="reset-btn">RESET PASSWORD</button>
            </Link>
        </div>
    );
}
