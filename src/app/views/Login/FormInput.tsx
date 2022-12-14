import React, { ChangeEvent, useEffect, useState } from "react";
import "./login.scss";

interface FormProps {
  id?: string;
  type: string;
  name: string;
  placeholder: string;
  errorMessage?: string;
  pattern?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput = ({
  type,
  name,
  placeholder,
  errorMessage,
  onChange,
  pattern,
  required,
}: FormProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const customInputProps = {
    focused: focused.toString(),
  };

  useEffect(() => {
    customInputProps.focused = focused.toString();
  }, [focused]);

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        pattern={pattern}
        onBlur={handleFocus}
        onChange={onChange}
        onFocus={() => name === "confirmPassword" && setFocused(true)}
        required={required}
        {...customInputProps}
      />
      <span className="errorMessage">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
