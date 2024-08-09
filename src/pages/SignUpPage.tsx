import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/styles/AuthPageStyle.css";
import React from "react";

function SignUpPage() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("")
  const [passMatch, setPassMatch] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    validatePassword();
  }, [password, cPassword]);

  const validatePassword = () => {
    password === cPassword
      ? setPassMatch(true)
      : setPassMatch(false);
  };

  useEffect(() => {
    if (user) {
      navigate('/create');
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      await signUp(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to sign in: ${err.message}`);
      }
    }
  };

  return (
    <div className="body">
      <div>
        <img className="logo" src="assets/images/Fisklogo.png"></img>
      </div>
      <div className="loginback">
        <div>
          <h1>Welcome to Fisk Events!</h1>
        </div>
        <div className="loginarea">
          <input
            placeholder="Email"
            className="textbox"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
          ></input>
          <input
            placeholder="Password"
            className="textbox"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          ></input>
          <input
            value={cPassword}
            aria-required="true"
            aria-invalid={passMatch ? true : false}
            placeholder="Confirm Password"
            className="textbox"
            onChange={(e) => {
              setcPassword(e.target.value);
            }}
            type="password"
          ></input>
          <div className="input-error">
            {password !== cPassword ? "" : ""}
          </div>
          <div className="input-error">
            {passMatch ? "" : "Error: Passwords do not match"}
          </div>
          <button
            className="button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <span>{error}</span>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;


