import { Link } from "react-router-dom";
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
    };

    return (
        <div className="login-container">
            <Link className="go-back" to="/">
                <button className="submit-btn-two" id="go-back-btn">
                    GO BACK
                </button>
            </Link>
            <br></br>
            <h3>Please login here: </h3>
            <br></br>
            {error && (
                <h4 style={{ color: "red" }}> Error, something went wrong </h4>
            )}
            <form className="login-box">
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
                {/* <Link to="/reset">
                    <button className="submit-btn-two" id="reset-btn">
                        RESET PASSWORD
                    </button>
                </Link> */}
                <button className="submit-btn" onClick={handleLogin}>
                    LOGIN
                </button>
            </div>
        </div>
    );
}
