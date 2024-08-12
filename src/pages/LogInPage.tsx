import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import "../assets/styles/AuthPageStyle.css";
import React from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import LogInPageForm from "../components/LogInPageForm";

function LoginPage() {
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
          <h1>Welcome back to Fisk Events!</h1>
        </div>
        <LogInPageForm />
      </div>
    </AuthPageContainer>
  );
}

export default LoginPage;
