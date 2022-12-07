import { Error } from '@common';

export interface LoginSchema {
    username:string;
    password:string;
    isLoading:boolean;
    error?:string;
    validationError?: Error
}
