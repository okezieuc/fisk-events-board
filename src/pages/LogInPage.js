import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "./signup.css";

function LoginPage() {
  const {user, signIn} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate('/create');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signIn(email, password);
    } catch (err) {
      setError(`Failed to sign in: [${err.code}] - ${err.message}`);
    }
  };

  return (
    <>
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
            <button
              className="button"
              onClick={(event) => {
                console.log("log in");
                handleSubmit(event);
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
