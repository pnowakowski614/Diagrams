import React, { ChangeEvent } from "react";
import "./login.scss";

interface FormProps {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ type, placeholder, onChange }: FormProps) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default FormInput;
