import { Link } from "react-router-dom";
import { useState } from "react";
import useForm from "../../hooks/use-form";

export default function Register() {
    const [userInput, handleChange] = useForm();
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
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
            <h1>Register Here</h1>
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
            </form>
            <div>
                <button className="submit-btn" onClick={handleSubmit}>
                    REGISTER
                </button>
                <Link to="/login">
                    <button className="submit-btn-two" id="login-btn">
                        LOGIN
                    </button>
                </Link>
            </div>
        </div>
    );
}
