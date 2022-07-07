import React from "react";

interface FormProps {
    placeholder: string
}

const FormInput = (props: FormProps) => {
    return (
        <div>
            <input type="text" placeholder={props.placeholder}/>
        </div>
    )
}

export default FormInput;