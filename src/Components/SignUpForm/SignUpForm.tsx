import React, { FormEvent, ReactElement, useState } from "react";
import { getInputWarnings, PREDICATES } from "../../Validation/predicates";
import S from "../../Strings/strings";

import "./SignUpForm.scss";

const usernameChecks = [PREDICATES.EMAIL];
const passwordChecks = [PREDICATES.CAPITAL, PREDICATES.NUMERIC, PREDICATES.SPECIAL];

function SignUpForm(): ReactElement {
  const [username, setUsername] = useState("");
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setUsername(value);
    setUsernameErrors(getInputWarnings(value, usernameChecks));
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setPassword(value);
    setPasswordErrors(getInputWarnings(value, passwordChecks));
  }

  function onConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setConfirmPassword(value);
  }

  function checkPasswordsMatch(): boolean {
    return password === confirmPassword;
  }

  function checkFormValid(): boolean {
    return !!username
      && !!password
      && !!confirmPassword
      && !usernameErrors.length
      && !passwordErrors.length
      && checkPasswordsMatch();
  }

  function signIn(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault(); // Prevents screen refresh
    if (checkFormValid()) {
      setSignedIn(true);
    }
  }

  function renderContent(): ReactElement {
    if (signedIn) {
      return <p>{S.successfullySignedUp}</p>;
    }
    return (
      <form className="sign-up-form" onSubmit={signIn}>
        <div className="input-container">
          <input
            placeholder={S.username}
            value={username}
            onChange={onUsernameChange}
          />
          <div className="warnings">
            { usernameErrors.map((msg) => <p key={msg}>{msg}</p>) }
          </div>
        </div>
        <div className="input-container">
          <input
            placeholder={S.password}
            value={password}
            onChange={onPasswordChange}
            type="password"
          />
          <div className="warnings">
            { passwordErrors.map((msg) => <p key={msg}>{msg}</p>) }
          </div>
        </div>
        <div className="input-container">
          <input
            placeholder={S.confirmPassword}
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            type="password"
          />
          <div className="warnings">
            { !checkPasswordsMatch() && <p>{S.passwordsMustMatch}</p> }
          </div>
        </div>
        <button
          type="submit"
          disabled={!checkFormValid()}
          className="submit-button"
        >
          {S.signUp}
        </button>
        { signedIn && <p>{S.successfullySignedUp}</p> }
      </form>
    );
  }

  return (
    <div className="container">
      {renderContent()}
    </div>
  );
}

export default SignUpForm;
