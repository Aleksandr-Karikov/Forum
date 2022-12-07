import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'shared/const/auth';
import { getCurrentUser } from 'entities/User/model/services/getCurrentUser';
import { AuthToken } from 'features/Register/model/services/register/register';
import { Error } from '@common';
import { api } from 'shared/api/axios';

interface LoginByUsernameProps {
    username:string,
    password:string
}

export const loginByUsername = createAsyncThunk<AuthToken, LoginByUsernameProps, {rejectValue: string | Error}>(
    '/login',
    async (authData, thunkApi) => {
        try {
            const response = await api.post<AuthToken>({ url: '/login', data: authData });

            Cookies.set(TOKEN_KEY, response.token);
            thunkApi.dispatch(getCurrentUser());

            return response;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);
