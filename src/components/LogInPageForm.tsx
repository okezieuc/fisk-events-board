import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import AuthPageTextInput from "./AuthPageTextInput";

const enum LogInError {
  None = '',
  InvalidCredentials = 'Incorrect Email or Password',
  MissingEmail = 'Empty field - email',
  MissingPassword = 'Empty field - password',
  Other = 'Error occured - Could not log in. Try again.'
  // password validation errors later
};

// if not here, it is a one-time error that should be attached to setInterval, later
const disablingErrors = [
  LogInError.MissingEmail,
  LogInError.MissingPassword,
];

const getLogInErrorFromFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
      return LogInError.InvalidCredentials;
    default:
      return LogInError.Other;
  }
};

const LogInPageForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const [error, setError] = useState<LogInError>(LogInError.None);

  useEffect(() => {
    if (email === '') {
      setError(LogInError.MissingEmail);
      return;
    }
    if (password === ''){
      setError(LogInError.MissingPassword);
      return;
    }

    setError(LogInError.None);
  }, [email, password]);

  useEffect(() => {
    if (disablingErrors.includes(error)) { }
  }, [error]);

  const handleSubmit = useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (disablingErrors.includes(error)) {
      throw new Error(error);
    }

    try {
      await signIn(email, password);
    } catch (_error) {
      if (_error instanceof FirebaseError) {
        setError(getLogInErrorFromFirebaseError(_error));
      }
    }
  }, [email, password, error, signIn]);

  return <div className="flex flex-col items-center justify-center gap-5">
    <AuthPageTextInput value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
    <AuthPageTextInput value={password} placeholder="Password" onChange={(event) => {setPassword(event.target.value);}} isHidden/>
    <button
      className={`${!disablingErrors.includes(error) ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-24 h-8`}
      onClick={handleSubmit}
      disabled={error !== LogInError.None}
    >
      Log In
    </button>
    <span className="text-red-500">{error}</span>
  </div>
};

export default LogInPageForm;
