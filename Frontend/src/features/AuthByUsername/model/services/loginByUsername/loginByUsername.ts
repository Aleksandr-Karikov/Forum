import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';

interface LoginByUsernameProps {
    username:string,
    password:string
}

enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROR = '',
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
    'login/register',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:5000/api/login', authData);
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkApi.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return thunkApi.rejectWithValue('error');
        }
    },
);
