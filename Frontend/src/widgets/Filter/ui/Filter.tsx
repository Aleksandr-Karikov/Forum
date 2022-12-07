import { classNames } from 'shared/lib/classNames/classNames';
import React, { FC, useState } from 'react';
import { Theme } from 'entities/Theme';
import { ThemeItem } from 'entities/Theme/ui/Theme/ThemeItem';
import { useTranslation } from 'react-i18next';
import { ReactPaginateProps } from 'react-paginate';
import { Paginator } from 'widgets/Paginator';
import { TextField } from '@mui/material';
import { FilterTypes } from '@common';
import cls from './Filter.module.scss';

interface FilterProps extends ReactPaginateProps{
    className?: string;
    filter: FilterTypes;
    onFilterChange: (filters: FilterTypes) => void
}

export const Filter: FC<FilterProps> = (props) => {
    const {
        className,
        pageCount,
        filter,
        onFilterChange,
    } = props;
    const { t } = useTranslation();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filter, search: e.target.value });
    };
    const handlePageChange = ({ selected }: {selected: number}) => {
        onFilterChange({ ...filter, page: selected });
    };

    return (
        <div
            className={classNames(cls.Filter, {}, [className])}
        >
            <TextField label="Поиск" placeholder="Найти..." value={filter.search} onChange={handleSearch} />
            <Paginator className={cls.paginator} pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
    );
};
