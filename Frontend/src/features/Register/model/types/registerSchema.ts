import { Error } from '@common';

export interface RegisterSchema {
    username:string;
    password:string;
    confirmPassword:string;
    isLoading:boolean;
    validationError?:Error | null;
    error?: string | null
}
