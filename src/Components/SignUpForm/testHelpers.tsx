import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";
import S from "../../Strings/strings";
import { IPredicate } from "../../Validation/predicates";

type IRenderForm = {
  getUsernameEl: () => HTMLElement;
  getPasswordEl: () => HTMLElement;
  getConfirmPasswordEl: () => HTMLElement;
  getSignUpButtonEl: () => HTMLElement;
  getWelcomeMessageEl: () => HTMLElement|null;
};

export function renderForm(): IRenderForm {
  render(<SignUpForm />);
  return {
    getUsernameEl: () => screen.getByPlaceholderText(S.username),
    getPasswordEl: () => screen.getByPlaceholderText(S.password),
    getConfirmPasswordEl: () => screen.getByPlaceholderText(S.confirmPassword),
    getSignUpButtonEl: () => screen.getByText(S.signUp),
    // the above *should* all exist, this will not on the first render
    // so we query instead of get to not through an error
    getWelcomeMessageEl: () => screen.queryByText(S.successfullySignedUp)
  };
}

/**
 * Asserts the failCases do show error message
 * Asserts the passCases do not show error message
 * @param label label text to find the input
 * @param predicate predicate to test
 * @param check description of what is being checked
 */
export function testInput(label: string, predicate: IPredicate, check: string): void {
  predicate.failCases.forEach((failCase) => (
    test(`${label} warns invalid ${check}: ${failCase}`, () => {
      render(<SignUpForm />);
      expect(screen.queryByText(predicate.errorMessage)).not.toBeInTheDocument();
      userEvent.type(screen.getByPlaceholderText(label), failCase);
      expect(screen.getByText(predicate.errorMessage)).toBeInTheDocument();
    })
  ));
  predicate.passCases.forEach((passCase) => (
    test(`${label} warns invalid ${check}: ${passCase}`, () => {
      render(<SignUpForm />);
      expect(screen.queryByText(predicate.errorMessage)).not.toBeInTheDocument();
      userEvent.type(screen.getByPlaceholderText(label), passCase);
      expect(screen.queryByText(predicate.errorMessage)).not.toBeInTheDocument();
    })
  ));
}
