import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterSchema } from '../types/registerSchema';
import { register } from '../services/register/register';

const initialState: RegisterSchema = {
    isLoading: false,
    password: '',
    username: '',
    confirmPassword: '',
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUserName: (state, action:PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action:PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action:PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
