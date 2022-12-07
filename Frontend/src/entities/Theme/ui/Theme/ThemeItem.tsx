import { classNames } from 'shared/lib/classNames/classNames';
import { FC } from 'react';
import { Theme } from 'entities/Theme';
import { fromStringNormalTime, fromStringToDate } from 'shared/lib/date/date';
import { Link } from 'react-router-dom';
import cls from './ThemeItem.module.scss';

interface ThemeProps{
    className?: string;
    theme: Theme
}

export const ThemeItem: FC<ThemeProps> = (props) => {
    const {
        theme,
        className,
    } = props;
    const { name, messages } = theme;
    const mods: Record<string, boolean> = {

    };

    return (
        <Link to={`/${theme.id}`}>
            <div
                className={classNames(cls.Theme, mods, [className])}
            >
                <h2 className={cls.name}>{name}</h2>
                {
                    messages.length > 0
                    && <p className={cls.message}>{`${fromStringNormalTime(messages[0].createdAt)} ${messages[0].text}`}</p>
                }
            </div>
        </Link>
    );
};
