import React, { ChangeEvent } from "react";
import './login.scss';

interface FormProps {
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const FormInput = ({placeholder, onChange}: FormProps) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} onChange={onChange}
            />
        </div>
    )
}

export default FormInput;
