import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import axios from 'axios';
import {Error} from '@common'

interface RegisterProps {
    username:string,
    password:string
}

enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROR = '',
}

export const register = createAsyncThunk<User, RegisterProps, {rejectValue: Error}>(
    '/register',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:5000/api/registration', authData);

            console.log('test')
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkApi.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e.response.data.errors)
            return thunkApi.rejectWithValue(e.response.data.errors);
        }
    },
);
