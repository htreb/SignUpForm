export type IPredicate = {
  regEx: RegExp;
  errorMessage: string;
  passCases: string[];
  failCases: string[];
};

const CAPITAL: IPredicate = {
  regEx: /[A-Z]/,
  errorMessage: "Missing capital letter",
  passCases: ["SomeP4$$word", "SomePa$$word", "SOMEPASSWORD"],
  failCases: ["somep4$$word", "somep4ssword", "somepassword"]
};

const NUMERIC: IPredicate = {
  regEx: /\d/,
  errorMessage: "Missing numeric character",
  passCases: ["SomeP4$$word", "SomePa$$w0rd", "SomeP4$$w0rd", "123456789"],
  failCases: ["somepa$$word", "somepassword", "SOMEPASSWORD", "!@#$%^&*())(*&"]
};

const SPECIAL: IPredicate = {
  regEx: /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
  errorMessage: "Missing special character",
  passCases: ["SomeP4$$word", "SomePa!w0rd", "So#meP4$$w0rd", "!@#$%^&*(@#(@$@#%(*&"],
  failCases: ["somepassword", "somePassword", "SOMEPASSWORD", "ETBebwe4tGB24EGTbg24tg24gWetwtrb"]
};

const EMAIL: IPredicate = {
  // this monster regex is from: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  regEx: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  errorMessage: "Invalid email address",
  passCases: ["username@email.com", "username@email.co.uk"],
  failCases: ["@email.com", "usernameemail.com", "username@.com", "username@email."]
};

export const PREDICATES = {
  CAPITAL,
  NUMERIC,
  SPECIAL,
  EMAIL
};
