import { Error } from '@common';
import { Theme } from 'entities/Theme';

export interface SendMessageSchema {
    message: string,
    isLoading:boolean;
    error?:string;
}
