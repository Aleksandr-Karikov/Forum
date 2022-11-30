import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, TextField } from '@mui/material';
import { getRegisterState } from 'features/Register/model/selectors/getLoginState/getRegisterState';
import { registerActions } from 'features/Register/model/slice/registerSlice';
import { register } from 'features/Register/model/services/register/register';
import cls from './RegisterForm.module.scss';
import InputField from "shared/ui/FormField/InputField/InputField";

interface LoginFormProps {
    className?: string;
}

export const RegisterForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading, confirmPassword,
    } = useSelector(getRegisterState);

    const onChangeUsername = useCallback((event) => {
        dispatch(registerActions.setUserName(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event) => {
        dispatch(registerActions.setPassword(event.target.value));
    }, [dispatch]);

    const onChangeConfirmPassword = useCallback((event) => {
        dispatch(registerActions.setConfirmPassword(event.target.value));
    }, [dispatch]);

    const onRegisterClick = useCallback(() => {
        dispatch(register({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Регистрация')} />
            {
                error && (
                    <></>
                    // <Text text={t('вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />
                )
            }
            <InputField
                errors={error}
                name={'username'}
                type="text"
                placeholder={t('Введите логин')}
                onChange={onChangeUsername}
                value={username}
                margin="normal"
            />
            <InputField
                errors={error}
                name={'password'}
                margin="normal"
                type="password"
                onChange={onChangePassword}
                value={password}
                placeholder={t('Введите пароль')}
            />
            <InputField
                margin="normal"
                type="password"
                onChange={onChangeConfirmPassword}
                value={confirmPassword}
                placeholder={t('Подтвердите пароль пароль')}
            />
            <Button
                onClick={onRegisterClick}
                className={cls.loginBtn}
                disabled={isLoading || password !== confirmPassword}
            >
                {t('Зарегистрироваться')}
            </Button>
        </div>

    );
});
