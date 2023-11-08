import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './registerview.module.css';
import { useNavigate } from "react-router-dom";

// Functional component for the registration view
const RegisterView = () => {
  // State variables for username, password, confirm password, and error handling
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [user, setUser] = useState();

  // UseNavigate hook for navigation
  const navigate = useNavigate();

  // Function to register a new user
  const registerUser = (event) => {
    console.log("Sending data:", { username, password, confirm_password: confirmPassword });

    axios
      .post("http://localhost:80/index.php/user/register",{
        username: username,
        password: password,
        confirm_password: confirmPassword
      })
      .then((response) => {
        console.log("Registration response:", response);
        if (response.data.success) {
          console.log("Registration successful");
          setUser(response.data.username);
          localStorage.setItem('user', response.data.username);
          navigate("/");
        } else {
          console.error(`Registration failed. ${response.data.username}`);
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  // Function to navigate to the login view
  const navigateToLogin = (e) => {
    e.preventDefault();
    console.log("Navigating to login...");
    navigate("/login", { replace: true });
    console.log("Navigation executed!");
  };

  // Rendering the registration form
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <h1 className={styles.heading}>Register Form</h1>
      {/* Registration form with input fields for username, password, and confirm password */}
      <form autoComplete="off" onSubmit={registerUser}>
        {/* Input for username with error handling */}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          className={`${styles.textField} ${usernameError ? styles.error : ""}`}
          value={username}
        />
        {/* Input for password with error handling */}
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          className={`${styles.textField} ${passwordError ? styles.error : ""}`}
          value={password}
        />
        {/* Input for confirming password with error handling */}
        <input
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
          className={`${styles.textField} ${confirmPasswordError ? styles.error : ""}`}
          value={confirmPassword}
        />
        {/* Register and Login buttons */}
        <button type="submit" className={styles.button}>
          Register
        </button>
        <button onClick={(e) => navigateToLogin(e)} className={styles.button}>
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

// Exporting the component as the default export
export default RegisterView;
