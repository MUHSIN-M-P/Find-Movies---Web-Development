import React from "react";
import InputField from "../Login/InputField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'
export const SignUp = () => {

  const [displayMessage, setDisplayMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#username").value;
    const confirmPassword = document.querySelector("#confirm-password").value
    if(!email||!username||!password){
      if (!username) {
        setDisplayMessage("username is required.")
      }else if (!email) {
        setDisplayMessage("email is required.")
      }else if (!password) {
        setDisplayMessage("password is required.")
      }
    }else if(password===confirmPassword){
      setDisplayMessage("")
      try {
        const response = await axios.post(
          "http://localhost:5000/signUp",
          { username, email, password },
          { withCredentials: true }
        );
        const message = response.data.message;
        const { token } = response.data;
        //setIsAuthenticated(true)
        if (message === "Signup successful") {
          localStorage.setItem('token', token);
          const sessionId = localStorage.getItem('sessionId')
          const username = localStorage.getItem('username')
          if(sessionId&&username){
            localStorage.removeItem('sessionId')
            localStorage.removeItem('sessionExpiration')

            localStorage.removeItem('username')
          }
          navigate("/");
                console.log("Signup successful");
        } else {
          setDisplayMessage(message);
        }
        
      } catch (error) {
        console.error("Sign up failed");
      }
    }else{
      setDisplayMessage("Passwords Does not Match")
    }
  };
  return (
    <div className="signup-container">
      <h2 className="form-title">Sign in</h2>
      <form action="#" className="signup-form">
        <InputField type="email" id="username" placeholder="User Name" icon="person" />
        <InputField type="email" id="email" placeholder="Email address" icon="mail" />
        <InputField type="password" id="password" placeholder="Password" icon="lock" />
        <InputField
          type="password"
          placeholder="Confirm-Password"
          icon="lock"
          id="confirm-password"
        />
        <p id="backend-message">{displayMessage}</p>
        <button type="submit" onClick={handleSubmit} className="signup-button">
          Sign up
        </button>
      </form>
      <p className="Login-prompt">
        Already have an account?{" "}
        <a href="/login" className="Login-link">
          Log In
        </a>
      </p>
    </div>
  );
};
