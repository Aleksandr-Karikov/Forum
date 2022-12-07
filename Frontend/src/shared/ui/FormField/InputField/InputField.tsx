import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Error } from '@common';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './InputField.module.scss';

type InputFieldProps = TextFieldProps & {
    errors?: Error,
    label?: string
}
const InputField = ({ ...props }: InputFieldProps) => {
    const {
        errors,
        label,
        name,
    } = props;
    return (
        <div>
            <TextField {...props} className={cls.input} />
            {
                errors && errors[name] && errors[name].map((err) => (
                    <Text text={err} theme={TextTheme.ERROR} />
                ))
            }
        </div>
    );
};

export default InputField;
