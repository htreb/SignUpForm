import { ReactElement } from "react";

type IProps = {
  placeholder: string;
  inputValue: string;
  inputChange: (val: string) => void;
  errors: string[];
  type?: string;
};

export function TextInputAndValidate({
  placeholder,
  inputValue,
  inputChange,
  errors,
  type
}: IProps): ReactElement {
  function renderWarnings(): ReactElement {
    const height = `${errors.length * 20}px`;
    return (
      <div className="warnings" style={{ height }}>
        {errors.map((error) => <p key={error}>{error}</p>)}
      </div>
    );
  }

  return (
    <div className="input-container">
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => inputChange(event.target.value)}
        type={type || "text"}
      />
      {renderWarnings()}
    </div>
  );
}
