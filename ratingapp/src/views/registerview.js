import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './registerview.module.css';
import { useNavigate } from "react-router-dom";

const RegisterView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

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

  const navigateToLogin = (e) => {
    e.preventDefault();
    console.log("Navigating to login...");
    navigate("/login", { replace: true });
    console.log("Navigation executed!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <h1 className={styles.heading}>Register Form</h1>
      <form autoComplete="off" onSubmit={registerUser}>
        {/* cross-checking the username */}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          className={`${styles.textField} ${usernameError ? styles.error : ""}`}
          value={username}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          className={`${styles.textField} ${passwordError ? styles.error : ""}`}
          value={password}
        />
        <input
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
          className={`${styles.textField} ${confirmPasswordError ? styles.error : ""}`}
          value={confirmPassword}
        />
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

export default RegisterView;
