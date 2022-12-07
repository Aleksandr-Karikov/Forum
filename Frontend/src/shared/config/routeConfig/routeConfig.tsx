import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { MainPage } from 'pages/MainPage';
import { ThemePage } from 'pages/ThemePage';

export enum AppRoutes {
    MAIN = 'main',
    Theme = 'theme',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.Theme]: '/:id',
    [AppRoutes.NOT_FOUND]: '/not-found',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
    [AppRoutes.Theme]: {
        path: RoutePath.theme,
        element: <ThemePage />,
    },
};
