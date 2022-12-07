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
import { Theme } from 'entities/Theme';

interface CreateThemeProps {
    name:string,
    message:string
}

export const createTheme = createAsyncThunk<Theme, CreateThemeProps, {rejectValue: string | Error}>(
    '/createTheme',
    async (newTheme, thunkApi) => {
        try {
            const response = await api.post<Theme>({ url: '/theme', data: newTheme });
            return response;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);
