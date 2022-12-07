import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { Theme } from 'entities/Theme';
import { ThemeItem } from 'entities/Theme/ui/Theme/ThemeItem';
import { useTranslation } from 'react-i18next';
import cls from './ThemeList.module.scss';

interface ThemeListProps{
    className?: string;
    themes: Theme[];
}

export const ThemeList: FC<ThemeListProps> = (props) => {
    const {
        themes = [],
        className,
    } = props;
    const { t } = useTranslation();
    const mods: Record<string, boolean> = {

    };

    return (
        <div
            className={classNames(cls.ThemeList, mods, [className])}
        >
            <h1 className={cls.title}>{t('Список тем')}</h1>
            {
                themes.length
                    ? themes.map((theme) => (
                        <ThemeItem className={cls.themeItem} key={theme.id} theme={theme} />
                    ))
                    : <h1>{ t('Список тем пуст')}</h1>
            }
        </div>
    );
};
