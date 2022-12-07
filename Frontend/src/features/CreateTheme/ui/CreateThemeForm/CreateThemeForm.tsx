import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback, useEffect } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button, TextField } from '@mui/material';
import { createThemeActions, getCreateThemeState } from 'features/CreateTheme';
import { createTheme } from 'features/CreateTheme/model/services/CreteaTheme/CreateTheme';
import InputField from 'shared/ui/FormField/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import cls from './CreateThemeForm.module.scss';

interface CreateThemeFormProps {
    className?: string;
    onSuccess: () => void;
}

export const CreateThemeForm = memo(({ className, onSuccess }: CreateThemeFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        name, message, validationError, error, isLoading, createdTheme,
    } = useSelector(getCreateThemeState);

    const onChangeName = useCallback((event) => {
        dispatch(createThemeActions.setName(event.target.value));
    }, [dispatch]);

    const onChangeMessage = useCallback((event) => {
        dispatch(createThemeActions.setMessage(event.target.value));
    }, [dispatch]);

    const onCreateClick = useCallback(() => {
        dispatch(createTheme({ name, message }));
        onSuccess();
    }, [dispatch, name, message, navigate]);

    useEffect(() => {
        if (createdTheme) {
            navigate(`/${createdTheme.id}`);
        }
    }, [createdTheme, navigate]);

    return (
        <div className={classNames(cls.CreateThemeForm, {}, [className])}>
            <Text title={t('Создание темы')} />
            {
                error && (
                    <Text text={error} theme={TextTheme.ERROR} />
                )
            }
            <InputField
                type="text"
                placeholder={t('Введите название темы')}
                label="Название"
                errors={validationError}
                onChange={onChangeName}
                name="name"
                value={name}
                margin="normal"
            />
            <InputField
                name="message"
                errors={validationError}
                label="Сообщение"
                margin="normal"
                onChange={onChangeMessage}
                value={message}
                placeholder={t('Введите первое сообщение')}
            />
            <Button
                onClick={onCreateClick}
                className={cls.loginBtn}
                disabled={isLoading}
            >
                {t('Создать')}
            </Button>
        </div>

    );
});
