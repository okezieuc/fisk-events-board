import React from "react";

type AuthPageTextInputProps = {
    value: string,
    placeholder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    isHidden?: boolean
}

const AuthPageTextInput = (props: AuthPageTextInputProps) => {
    return <input
        value={props.value}
        placeholder={props.placeholder}
        className="w-64 h-7 rounded-full border-none px-3"
        onChange={props.onChange}
        type={props.isHidden ? "password" : "text"}
    />;
};

export default AuthPageTextInput;