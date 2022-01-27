import { Link } from "react-router-dom";
import { Component } from "react";
import { useEffect, useState } from "react";
import useForm from "../../hooks/use-form";

export default function Login() {
    const [error, setError] = useState(false);
    const [userInput, handleChange] = useForm();

    useEffect(() => {
        console.log("login is mounted");
    }, []);

    // handleChange(e) {
    //     console.log("user wants to change data");
    // //     this.setState(
    // //         {
    // //             [e.target.name]: e.target.value,
    // //         },
    // //         () => {
    // //             console.log("handle Change Update done:", this.state);
    // //             this.setState({
    // //                 error: false,
    // //             });
    // //         }
    // //     );
    // }

    // const handleLogin = (e) {

    //     e.preventDefault();
    //     console.log("user wants to submit login data");

    //     // fetch("/login.json", {
    //     //     method: "POST",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //     },
    //     //     body: JSON.stringify(this.state),
    //     // })
    //     //     .then((data) => {
    //     //         console.log("Data from handle Login: ", data);
    //     //         return data.json();
    //     //     })
    //     //     .then((data) => {
    //     //         console.log("response data from /login.json", data);
    //     //         if (data.success) {
    //     //             location.replace("/");
    //     //             // location.reload();
    //     //         } else {
    //     //             this.setState({
    //     //                 error: true,
    //     //             });
    //     //         }
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log("error in fetch login.json", err);
    //     //         this.setState({
    //     //             error: true,
    //     //         });
    //     //     });
    // }

    return (
        <div className="login-container">
            <h1>I am in Login Container</h1>

            <Link to="/">
                <button id="go-back-btn">GO BACK</button>
            </Link>
            <h1>You can login here: </h1>
            {/* {this.state.error && (
                <h3 style={{ color: "red" }}> Error, something went wrong </h3>
            )} */}
            {/* <form>
                <input
                    onChange={this.handleChange}
                    name="email"
                    placeholder="your@email.com"
                    type="email"
                />
                <input
                    onChange={this.handleChange}
                    name="password"
                    placeholder="password"
                    type="password"
                />
                <button onClick={this.handleLogin}>LOGIN</button>
            </form> */}
            <Link to="/reset">
                <button id="reset-btn">RESET PASSWORD</button>
            </Link>
        </div>
    );
}
