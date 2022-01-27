import { Link } from "react-router-dom";
// import { Component } from "react";
import { useEffect, useState } from "react";
import useForm from "../../hooks/use-form";

export default function Register() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);

    console.log("user Input from handleChange", userInput);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("please handle submit");

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((data) => {
                console.log("Data from handle Submit: ", data);
                return data.json();
            })
            .then((data) => {
                console.log("response data from /register.json", data);

                if (data.success) {
                    location.replace("/");
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in fetch register.json", err);
                setError(true);
            });
    };

    return (
        <div className="register-container">
            <h1>Register Container</h1>
            {error && (
                <h4 style={{ color: "red" }}> Error, something went wrong </h4>
            )}
            <form>
                <input
                    onChange={handleChange}
                    name="first"
                    placeholder="First Name"
                    type="text"
                />
                <input
                    onChange={handleChange}
                    name="last"
                    placeholder="Last Name"
                    type="text"
                />
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
                <button onClick={handleSubmit}>REGISTER</button>
            </form>
            <Link to="/login">
                <button id="login-btn">LOGIN</button>
            </Link>
        </div>
    );
}
