import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Error } from '@common';
import { TOKEN_KEY } from 'shared/const/auth';
import { api } from 'shared/api/axios';
import { getCurrentUser } from 'entities/User/model/services/getCurrentUser';

interface RegisterProps {
    username:string,
    password:string
}

export interface AuthToken {
    token: string;
}

export const register = createAsyncThunk<AuthToken, RegisterProps, {rejectValue: Error | string}>(
    '/register',
    async (authData, thunkApi) => {
        try {
            const response = await api.post<AuthToken>({ url: '/registration', data: authData });
            Cookies.set(TOKEN_KEY, response.token);
            thunkApi.dispatch(getCurrentUser());
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    },
);
