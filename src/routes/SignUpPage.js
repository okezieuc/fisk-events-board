import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import "./signup.css";
import app from "../utils/firebase";

const auth = getAuth(app);

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <>
      <div className="body">
        <div>
          <img className="logo" src="Fisklogo.png"></img>
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
              onClick={() => {
                createUser();
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
