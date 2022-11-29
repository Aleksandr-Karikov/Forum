import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cls from './Portal.module.scss';

interface PortalProps {
    children?: ReactNode;
    element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
    const {
        element = document.body,
        children,
    } = props;

    return createPortal(children, element);
};
