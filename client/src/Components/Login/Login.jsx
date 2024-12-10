import React from "react";
import axios from "axios";
import InputField from "./InputField";
import SocialLogin from "./SocialLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export const Login = () => {
  const [displayMessage, setDisplayMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    if (!email || !password) {
      if (!email) {
        setDisplayMessage("email is required.");
      } else {
        setDisplayMessage("password is required.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const { token } = response.data;
        if (response.data.message === "Login successful") {
          localStorage.setItem("token", token);
          const sessionId = localStorage.getItem("sessionId");
          const username = localStorage.getItem("username");
          if (sessionId && username) {
            localStorage.removeItem("sessionId");
            localStorage.removeItem("username");
            localStorage.removeItem("sessionExpiration");
          }
          //setIsAuthenticated(true);
          navigate("/");
          console.log("Login successful");
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status code
          setDisplayMessage(error.response.data.message);
        } else {
          // Other errors (e.g., network errors)
          console.error("Login failed", error.message);
        }
      }
    }
  };
  console.log(displayMessage);
  return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />
      <p className="separator">
        <span>or</span>
      </p>
      <form action="#" className="login-form">
        <InputField
          type="email"
          id="email"
          placeholder="Email address"
          icon="mail"
        />
        <InputField
          type="password"
          id="password"
          placeholder="Password"
          icon="lock"
        />
        <a href="#" className="forgot-password-link">
          Forgot password?
        </a>
        <p id="backend-message">{displayMessage}</p>
        <button onClick={handleSubmit} type="submit" className="login-button">
          Log In
        </button>
      </form>
      <p className="signup-prompt">
        Don&apos;t have an account?{" "}
        <a href="/signUp" className="signup-link">
          Sign up
        </a>
      </p>
    </div>
  );
};
