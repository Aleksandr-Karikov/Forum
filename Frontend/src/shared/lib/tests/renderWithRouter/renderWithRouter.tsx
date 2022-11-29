import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '../../../config/i18n/i18nForTests';

export interface renderWithRouterOptions {
    route: string;
}

export function RenderWithRoute(component: ReactNode, options: renderWithRouterOptions) {
    const { route } = options;
    return render(
        <MemoryRouter initialEntries={[]}>
            <I18nextProvider i18n={i18nForTests}>
                {component}
            </I18nextProvider>
        </MemoryRouter>,
    );
}
