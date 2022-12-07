import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Error } from '@common';
import { createTheme } from 'features/CreateTheme/model/services/CreteaTheme/CreateTheme';
import { CreateThemeSchema } from 'features/CreateTheme/model/types/CreateTheme';
import { Theme } from 'entities/Theme';

const initialState: CreateThemeSchema = {
    isLoading: false,
    error: null,
    validationError: null,
    name: '',
    message: '',
    createdTheme: null,
};

export const createThemeSlice = createSlice({
    name: 'createTheme',
    initialState,
    reducers: {
        setName: (state, action:PayloadAction<string>) => {
            state.name = action.payload;
        },
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
            state.createdTheme = action.payload;
            state.isLoading = false;
        });
        builder.addCase(createTheme.rejected, (state, action) => {
            state.isLoading = false;
            if (typeof action.payload === 'string') {
                state.error = action.payload as string;
                state.validationError = null;
            } else {
                state.error = null;
                state.validationError = action.payload as Error;
            }
        });
    },
});

export const { actions: createThemeActions } = createThemeSlice;
export const { reducer: createThemeReducers } = createThemeSlice;
