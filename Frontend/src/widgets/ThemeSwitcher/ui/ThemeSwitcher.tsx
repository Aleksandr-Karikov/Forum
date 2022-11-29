import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/lightLogo.svg';
import DarkIcon from 'shared/assets/icons/darkLogo.svg';
import { Button } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            className={classNames('', {}, [className])}
        >
            {Theme.LIGHT === theme ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
};
