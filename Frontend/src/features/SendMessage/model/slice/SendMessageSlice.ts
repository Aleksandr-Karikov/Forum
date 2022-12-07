import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '@common';
import { createTheme } from 'features/CreateTheme/model/services/CreteaTheme/CreateTheme';
import { CreateThemeSchema } from 'features/CreateTheme/model/types/CreateTheme';
import { Theme } from 'entities/Theme';
import { SendMessageSchema } from 'features/SendMessage/model/types/SendMessage';

const initialState: SendMessageSchema = {
    isLoading: false,
    error: null,
    message: '',
};

export const sendMessageSlice = createSlice({
    name: 'sendMessage',
    initialState,
    reducers: {
        setMessage: (state, action:PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createTheme.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(createTheme.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(createTheme.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { actions: sendMessageActions } = sendMessageSlice;
export const { reducer: sendMessageReducers } = sendMessageSlice;
