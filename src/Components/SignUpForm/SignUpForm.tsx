import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { getInputWarnings, IPredicate, PREDICATES } from "../../Validation/predicates";
import S from "../../Strings/strings";

import "./SignUpForm.scss";
import { TextInputAndValidate } from "../TextInputAndValidate/TextInputAndValidate";

const usernameChecks = [PREDICATES.EMAIL];
const passwordChecks = [PREDICATES.CAPITAL, PREDICATES.NUMERIC, PREDICATES.SPECIAL];

function SignUpForm(): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    if (username || password || confirmPassword) {
      setIsFormDirty(true);
    }
  }, [username, password, confirmPassword]);

  function checkPasswordsMatch(): boolean {
    return password === confirmPassword;
  }

  function getErrors(value: string, checks: IPredicate[]): string[] {
    if (!isFormDirty) return [];
    return getInputWarnings(value, checks);
  }

  function checkFormValid(): boolean {
    return !!username
      && !!password
      && !!confirmPassword
      && !getErrors(username, usernameChecks).length
      && !getErrors(password, passwordChecks).length
      && checkPasswordsMatch();
  }

  function signIn(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault(); // Prevents screen refresh
    if (checkFormValid()) {
      setSignedIn(true);
    }
  }

  function renderContent(): ReactElement {
    if (signedIn) {
      return (
        <div className="success">
          <h1>{S.successfullySignedUp}</h1>
          <img src="https://c.tenor.com/9ItR8nSuxE0AAAAM/thumbs-up-computer.gif" alt="success!" />
        </div>
      );
    }
    return (
      <form className="sign-up-form" onSubmit={signIn}>
        <h1>{S.welcome}</h1>
        <TextInputAndValidate
          placeholder={S.username}
          inputValue={username}
          inputChange={setUsername}
          errors={getErrors(username, usernameChecks)}
        />

        <TextInputAndValidate
          placeholder={S.password}
          inputValue={password}
          inputChange={setPassword}
          errors={getErrors(password, passwordChecks)}
          type="password"
        />

        <TextInputAndValidate
          placeholder={S.confirmPassword}
          inputValue={confirmPassword}
          inputChange={setConfirmPassword}
          errors={checkPasswordsMatch() ? [] : [S.passwordsMustMatch]}
          type="password"
        />

        <button
          type="submit"
          disabled={!checkFormValid()}
          className="submit-button"
        >
          {S.signUp}
        </button>
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
