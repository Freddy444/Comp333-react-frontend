import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import styles from './loginview.module.css';
import { useNavigate } from "react-router-dom";
import { Input as AltInput, Button as AltButton } from 'reactstrap';

const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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

    const navigateToRegister = (e) => {
        e.preventDefault(); 
        console.log("Navigating to register...");
        navigate("/register", { replace: true });
        console.log("Navigation executed!");
      };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.heading}>Login Form</h1>
                {error && <p className={styles.error}>{error}</p>}
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

export default LoginView;

