import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetThemesQuery } from 'app/providers/StoreProvider/config/api';
import { PageLoader } from 'widgets/PageLoader';
import { ThemeList } from 'entities/Theme/ui/ThemeList/ThemeList';
import { Filter } from 'widgets/Filter/ui/Filter';
import { FilterTypes } from '@common';
import cls from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation('main');
    const [filter, setFilter] = useState<FilterTypes>({ page: 0, limit: 10, search: '' });
    const { data: themeData, isLoading } = useGetThemesQuery(filter);
    const handleFilterChange = (filter: FilterTypes) => {
        setFilter(filter);
    };
    return (
        <div className={cls.MainPage}>
            <Filter
                className={cls.filter}
                pageCount={themeData?.pages || 0}
                onFilterChange={handleFilterChange}
                filter={filter}
            />
            {
                isLoading
                    ? <PageLoader />
                    : <ThemeList themes={themeData.themes} />
            }
        </div>
    );
};

export default MainPage;
