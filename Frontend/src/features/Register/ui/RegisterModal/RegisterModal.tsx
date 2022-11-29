import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import cls from './RegisterModal.module.scss';

interface RegisterModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegisterModal = ({ className, onClose, isOpen }: RegisterModalProps) => (
    <Modal
        className={classNames(cls.LoginModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <RegisterForm />
    </Modal>
);
