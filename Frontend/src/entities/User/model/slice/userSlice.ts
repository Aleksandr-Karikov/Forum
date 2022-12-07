import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getCurrentUser } from 'entities/User/model/services/getCurrentUser';
import { TOKEN_KEY } from 'shared/const/auth';
import Cookies from 'js-cookie';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    user: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            Cookies.remove(TOKEN_KEY);
            state.user = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state, action) => {
            state.error = null;
            state.isLoading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            console.log(action);
            state.user = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
