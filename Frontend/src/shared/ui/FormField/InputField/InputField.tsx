import React from 'react';
import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import {Error} from '@common'
import cls from './InputField.module.scss'

type InputField = TextFieldProps & {
    errors?: Error
}
const InputField = ({...props}: InputField) => {
    const {
        errors,
        name
    } = props;
    return (
        <div>
            <TextField {...props} className={cls.input}/>
            {
                errors && errors[name] && errors[name].map((err) => (
                    <p>{err}</p>
                ))
            }
        </div>
    );
};

export default InputField;