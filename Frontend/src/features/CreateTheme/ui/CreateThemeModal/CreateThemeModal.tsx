import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { CreateThemeForm } from 'features/CreateTheme/ui/CreateThemeForm/CreateThemeForm';
import cls from './CreateThemeModal.module.scss';

interface CreateThemeProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const CreateThemeModal = ({ className, onClose, isOpen }: CreateThemeProps) => (
    <Modal
        className={classNames(cls.CreateThemeModal, {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <CreateThemeForm onSuccess={onClose} />
    </Modal>
);
