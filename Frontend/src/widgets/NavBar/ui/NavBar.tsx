import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getUser, userActions } from 'entities/User';
import { RegisterModal } from 'features/Register/ui/RegisterModal/RegisterModal';
import { CreateThemeModal } from 'features/CreateTheme';
import { Link } from 'react-router-dom';
import cls from './NavBar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);
    const [isCreateThemeModal, setIsCreateThemeModal] = useState(false);
    const user = useSelector(getUser);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const onCloseLoginModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onOpenLoginModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseRegisterModal = useCallback(() => {
        setIsRegisterModal(false);
    }, []);

    const onOpenCreateThemeModal = useCallback(() => {
        setIsCreateThemeModal(true);
    }, []);
    const onCloseCreateThemeModal = useCallback(() => {
        setIsCreateThemeModal(false);
    }, []);

    const onOpenRegisterModal = useCallback(() => {
        setIsRegisterModal(true);
    }, []);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (user) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button>
                    <Link to="/">
                        {t('Главная')}
                    </Link>
                </Button>
                <Button
                    onClick={onLogout}
                >
                    {t('Выйти')}
                </Button>
                <Button
                    onClick={onOpenCreateThemeModal}
                >
                    {t('Создать тему')}
                </Button>
                <CreateThemeModal onClose={onCloseCreateThemeModal} isOpen={isCreateThemeModal} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button>
                <Link to="/">
                    {t('Главная')}
                </Link>
            </Button>

            <Button
                onClick={onOpenLoginModal}
            >
                {t('Войти')}
            </Button>
            <Button
                onClick={onOpenRegisterModal}
            >
                {t('Зарегистрироваться')}
            </Button>
            <LoginModal onClose={onCloseLoginModal} isOpen={isAuthModal} />
            <RegisterModal onClose={onCloseRegisterModal} isOpen={isRegisterModal} />
        </div>
    );
};
