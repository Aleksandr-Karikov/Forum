import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, TextField } from '@mui/material';
import { getRegisterState } from 'features/Register/model/selectors/getLoginState/getRegisterState';
import { registerActions } from 'features/Register/model/slice/registerSlice';
import { register } from 'features/Register/model/services/register/register';
import InputField from 'shared/ui/FormField/InputField/InputField';
import cls from './RegisterForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const RegisterForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading, confirmPassword, validationError,
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
                    <Text text={error} theme={TextTheme.ERROR} />
                )
            }
            <InputField
                label="Имя пользователя"
                errors={validationError}
                name="username"
                type="text"
                placeholder={t('Введите логин')}
                onChange={onChangeUsername}
                value={username}
                margin="normal"
            />
            <InputField
                label="Пароль"
                errors={validationError}
                name="password"
                margin="normal"
                type="password"
                onChange={onChangePassword}
                value={password}
                placeholder={t('Введите пароль')}
            />
            <InputField
                label="Подтверждение пароля"
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
