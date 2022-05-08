import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PREDICATES } from "../../Validation/predicates";
import { renderForm, testInput } from "./testHelpers";
import S from "../../Strings/strings";

const VALID_PASSWORD = "someValidP4a$$w0rd";

describe("Validates input fields", () => {
  testInput(S.username, PREDICATES.EMAIL, "Email");
  testInput(S.password, PREDICATES.CAPITAL, "Capital letters");
  testInput(S.password, PREDICATES.NUMERIC, "Numeric digits");
  testInput(S.password, PREDICATES.SPECIAL, "Special characters");
});

describe(("Validates password and confirm password must match"), () => {
  test("Passwords do not match", async () => {
    const { getPasswordEl, getConfirmPasswordEl } = renderForm();
    expect(screen.queryByText(S.passwordsMustMatch)).not.toBeInTheDocument();

    userEvent.type(getPasswordEl(), VALID_PASSWORD);
    userEvent.type(getConfirmPasswordEl(), `${VALID_PASSWORD}xyz`);

    expect(screen.getByText(S.passwordsMustMatch)).toBeInTheDocument();
  });

  test("Passwords match", async () => {
    const { getPasswordEl, getConfirmPasswordEl } = renderForm();
    expect(screen.queryByText(S.passwordsMustMatch)).not.toBeInTheDocument();

    userEvent.type(getPasswordEl(), VALID_PASSWORD);
    userEvent.type(getConfirmPasswordEl(), VALID_PASSWORD);

    expect(screen.queryByText(S.passwordsMustMatch)).not.toBeInTheDocument();
  });
});

describe("Test sign up", () => {
  test("Sign in is disabled without inputs", () => {
    const { getSignUpButtonEl, getWelcomeMessageEl } = renderForm();
    expect(getSignUpButtonEl()).toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();
  });

  test("Sign in is disabled with invalid inputs", () => {
    const { getUsernameEl, getPasswordEl, getConfirmPasswordEl, getSignUpButtonEl, getWelcomeMessageEl } = renderForm();
    expect(getSignUpButtonEl()).toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();

    userEvent.type(getUsernameEl(), "someinvalidemail.com");
    userEvent.type(getPasswordEl(), "invalid password");
    userEvent.type(getConfirmPasswordEl(), "not matching password");

    expect(getSignUpButtonEl()).toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();
  });

  test("Sign in is enabled with valid inputs", () => {
    const { getUsernameEl, getPasswordEl, getConfirmPasswordEl, getSignUpButtonEl, getWelcomeMessageEl } = renderForm();
    expect(getSignUpButtonEl()).toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();

    userEvent.type(getUsernameEl(), "some@email.com");
    userEvent.type(getPasswordEl(), VALID_PASSWORD);
    userEvent.type(getConfirmPasswordEl(), VALID_PASSWORD);

    expect(getSignUpButtonEl()).not.toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();
  });

  test("Sign in successful with valid inputs", () => {
    const { getUsernameEl, getPasswordEl, getConfirmPasswordEl, getSignUpButtonEl, getWelcomeMessageEl } = renderForm();
    expect(getSignUpButtonEl()).toBeDisabled();
    expect(getWelcomeMessageEl()).not.toBeInTheDocument();

    userEvent.type(getUsernameEl(), "some@email.com");
    userEvent.type(getPasswordEl(), VALID_PASSWORD);
    userEvent.type(getConfirmPasswordEl(), VALID_PASSWORD);

    expect(getSignUpButtonEl()).not.toBeDisabled();
    userEvent.click(getSignUpButtonEl());
    expect(getWelcomeMessageEl()).toBeInTheDocument();
  });
});
