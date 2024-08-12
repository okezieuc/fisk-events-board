import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/styles/AuthPageStyle.css";
import React from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import SignUpPageForm from "../components/SignUpPageForm";

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
    <AuthPageContainer>
      <div>
        <div>
          <h1>Welcome to Fisk Events!</h1>
        </div>
        <SignUpPageForm />
      </div>
    </AuthPageContainer>
  );
}

export default SignUpPage;


