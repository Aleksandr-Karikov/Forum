import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { api } from 'shared/api/axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from 'shared/const/auth';

export const getCurrentUser = createAsyncThunk<User, null, {rejectValue: string}>(
    '/user',
    async (_, thunkApi) => {
        try {
            if (!Cookies.get(TOKEN_KEY)) {
                return null;
            }
            const user = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY));
            if (user) {
                // thunkApi.dispatch(userActions.setUser(user));
                return user;
            }
            const response = await api.get<User>({ url: '/user' });
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response));
            return response;
        } catch (error) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            return thunkApi.rejectWithValue(error);
        }
    },
);
