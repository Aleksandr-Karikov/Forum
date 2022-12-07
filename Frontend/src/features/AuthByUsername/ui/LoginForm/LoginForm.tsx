import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, TextField } from '@mui/material';
import InputField from 'shared/ui/FormField/InputField/InputField';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, error, isLoading, validationError,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((event) => {
        dispatch(loginActions.setUserName(event.target.value));
    }, [dispatch]);

    const onChangePassword = useCallback((event) => {
        dispatch(loginActions.setPassword(event.target.value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Вход в аккаунт')} />
            {
                error && (
                    <Text text={error} theme={TextTheme.ERROR} />
                )
            }
            <InputField
                errors={validationError}
                name="username"
                label="Имя пользователя"
                type="text"
                placeholder={t('Введите логин')}
                onChange={onChangeUsername}
                value={username}
                margin="normal"
            />
            <InputField
                errors={validationError}
                name="password"
                label="Пароль"
                margin="normal"
                type="password"
                onChange={onChangePassword}
                value={password}
                placeholder={t('Введите пароль')}
            />
            <Button
                onClick={onLoginClick}
                className={cls.loginBtn}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>

    );
});
