import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/styles/AuthPageStyle.css";
import React from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import SignUpPageForm from "../components/SignUpPageForm";

function SignUpPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/create');
    }
  }, [user, navigate]);

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


