import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';

interface RegisterProps {
    username:string,
    password:string
}

enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROR = '',
}

export const register = createAsyncThunk<User, RegisterProps, {rejectValue: string}>(
    '/register',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:5000/api/registration', authData);
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkApi.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    },
);
