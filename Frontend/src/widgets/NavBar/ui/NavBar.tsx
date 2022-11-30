import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getUserAuthData, userActions } from 'entities/User';
import { RegisterModal } from 'features/Register/ui/RegisterModal/RegisterModal';
import cls from './NavBar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);
    const authData = useSelector(getUserAuthData);
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

    const onOpenRegisterModal = useCallback(() => {
        setIsRegisterModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    onClick={onLogout}
                >
                    Выйти
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                onClick={onOpenLoginModal}
            >
                Войти
            </Button>
            <Button
                onClick={onOpenRegisterModal}
            >
                Зарегистрироваться
            </Button>
            <LoginModal onClose={onCloseLoginModal} isOpen={isAuthModal} />
            <RegisterModal onClose={onCloseRegisterModal} isOpen={isRegisterModal} />
        </div>
    );
};
