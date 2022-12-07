import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import cls from './Paginator.module.scss';

interface PaginatorProps extends ReactPaginateProps{
    className?: string;
}

export const Paginator: FC<PaginatorProps> = (props) => {
    const {
        pageCount,
        onPageChange,
        className,
    } = props;
    const { t } = useTranslation();
    const mods: Record<string, boolean> = {

    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={onPageChange}
            className={classNames(cls.Paginator, mods, [className])}
            previousClassName={cls.previous}
            pageClassName={cls.page}
            nextClassName={cls.next}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};
