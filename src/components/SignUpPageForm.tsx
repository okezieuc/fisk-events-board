import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import AuthPageTextInput from "./AuthPageTextInput";

const enum SignUpError {
  None = '',
  ExistingEmailAddress = 'This email address already exists',
  PasswordMismatch = 'Passwords do not match',
  MissingEmail = 'Empty field - email',
  MissingPassword = 'Empty field - password',
  Other = 'Error occured - Could not sign up. Try again.'
  // password validation errors later
};

// if not here, it is a one-time error that should be attached to setInterval, later
const disablingErrors = [
  SignUpError.PasswordMismatch,
  SignUpError.MissingEmail,
  SignUpError.MissingPassword,
];

const getSignUpErrorFromFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return SignUpError.ExistingEmailAddress;
    default:
      return SignUpError.Other;
  }
};

const SignUpPageForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { signUp } = useAuth();

  const [error, setError] = useState<SignUpError>(SignUpError.None);

  useEffect(() => {
    if (email === '') {
      setError(SignUpError.MissingEmail);
      return;
    }
    if (password === ''){
      setError(SignUpError.MissingPassword);
      return;
    }
    if (password !== passwordConfirm) {
      setError(SignUpError.PasswordMismatch);
      return;
    }

    setError(SignUpError.None);
  }, [email, password, passwordConfirm]);

  useEffect(() => {
    if (disablingErrors.includes(error)) { }
  }, [error]);

  const handleSubmit = useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (disablingErrors.includes(error)) {
      throw new Error(error);
    }

    try {
      await signUp(email, password);
    } catch (_error) {
      if (_error instanceof FirebaseError) {
        setError(getSignUpErrorFromFirebaseError(_error));
      }
    }
  }, [email, password, error, signUp]);

  return <div className="flex flex-col items-center justify-center gap-5">
    <AuthPageTextInput value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
    <AuthPageTextInput value={password} placeholder="Password" onChange={(event) => {setPassword(event.target.value);}} isHidden/>
    <AuthPageTextInput value={passwordConfirm} placeholder="Confirm Password" onChange={(event) => {setPasswordConfirm(event.target.value);}} isHidden/>
    <button
      className={`${!disablingErrors.includes(error) ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-400'} text-white rounded-full w-24 h-8`}
      onClick={handleSubmit}
      disabled={error !== SignUpError.None}
    >
      Sign Up
    </button>
    <span className="text-red-500">{error}</span>
  </div>
};

export default SignUpPageForm;