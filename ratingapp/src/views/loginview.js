import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import styles from './loginview.module.css';
import { useNavigate } from "react-router-dom";
import { Input as AltInput, Button as AltButton } from 'reactstrap';

// Functional component for the login view
const LoginView = () => {
    // State variables for username, password, logged-in user, and error
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [error, setError] = useState(null);

    // UseNavigate hook for navigation
    const navigate = useNavigate();

    // useEffect to check if the user is already logged in
    useEffect(() => {
        const loggedInUser = Cookies.get('name');
        if (loggedInUser) {
            const foundUser = loggedInUser;
            setUser(foundUser);
        }
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // Function to handle user login
    const loginUser = (event) => {
        console.log("Logging in...");

        event.preventDefault();

        axios
            .post("http://localhost:80/index.php/user/login", {
                username: username,
                password: password,
            })
            .then((response) => {
                if (response.data.success) {
                    setUser(response.data.username);
                    Cookies.set('name', response.data.username, { expires: 1 });
                    navigate("/");
                } else {
                    setError(`Login failed. ${response.data.message}`);
                }
            })
            .catch((error) => {
                setError("Error Logging in user. Please try again."); 
            });
    };

    // Function to navigate to the registration view
    const navigateToRegister = (e) => {
        e.preventDefault(); 
        console.log("Navigating to register...");
        navigate("/register", { replace: true });
        console.log("Navigation executed!");
    };

    // Rendering the login form
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.heading}>Login Form</h1>
                {error && <p className={styles.error}>{error}</p>}
                {/* Login form with input fields for username and password */}
                <form autoComplete="off" onSubmit={loginUser}>
                    <div className={styles.MuiFormControlRoot}>
                        <AltInput
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.MuiFormControlRoot}>
                        <AltInput
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Login and Register buttons */}
                    <AltButton color="secondary" type="submit">
                        Login
                    </AltButton>
                    <AltButton color="primary" onClick={(e) => navigateToRegister(e)}>
                        Register
                    </AltButton>
                </form>
            </div>
        </div>
    );
};

// Exporting the component as the default export
export default LoginView;
