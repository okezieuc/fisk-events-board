import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/styles/AuthPageStyle.css";
import React from "react";

function LoginPage() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate('/create');
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to sign in: ${err.message}`);
      }
    }
  };

  return (
    <div className="body">
      <div>
        <img className="logo" src="assets/images/Fisklogo.png" alt="Fisk Logo" />
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
          <button
            className="button"
            onClick={(event) => {
              console.log("log in");
              handleSubmit(event);
            }}
          >
            Log In
          </button>
          <span>{error}</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
