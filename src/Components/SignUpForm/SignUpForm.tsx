import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { getInputWarnings, PREDICATES } from "../../Validation/predicates";
import S from "../../Strings/strings";

const usernameChecks = [PREDICATES.EMAIL];
const passwordChecks = [PREDICATES.CAPITAL, PREDICATES.NUMERIC, PREDICATES.SPECIAL];

function SignUpForm(): ReactElement {
  const [username, setUsername] = useState("");
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(false);
  }, [username, password, confirmPassword]);

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

  return (
    <form className="App" onSubmit={signIn}>
      <div>
        <input
          placeholder={S.username}
          value={username}
          onChange={onUsernameChange}
        />
        { usernameErrors.map((msg) => <p key={msg}>{msg}</p>) }
      </div>
      <div>
        <input
          placeholder={S.password}
          value={password}
          onChange={onPasswordChange}
        />
        { passwordErrors.map((msg) => <p key={msg}>{msg}</p>) }
      </div>
      <div>
        <input
          placeholder={S.confirmPassword}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        { !checkPasswordsMatch() && <p>{S.passwordsMustMatch}</p> }
      </div>
      <button
        type="submit"
        disabled={!checkFormValid()}
      >
        {S.signUp}
      </button>
      { signedIn && <p>{S.successfullySignedUp}</p> }
    </form>
  );
}

export default SignUpForm;
