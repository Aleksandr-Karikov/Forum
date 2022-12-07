import { Error } from '@common';
import { Theme } from 'entities/Theme';

export interface CreateThemeSchema {
    name: string,
    message: string,
    isLoading:boolean;
    error?:string;
    validationError?: Error,
    createdTheme?: Theme
}
