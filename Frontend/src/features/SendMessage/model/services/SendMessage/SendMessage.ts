import { createAsyncThunk } from '@reduxjs/toolkit';
import { Error } from '@common';
import { api } from 'shared/api/axios';
import { Theme } from 'entities/Theme';
import { Message } from 'entities/Message/model/types/message';

interface sendMessageProps {
    text:string;
    themeId: number;
    refetch: ()=>void;
}

export const sendMessage = createAsyncThunk<Message, sendMessageProps, {rejectValue: string | Error}>(
    '/sendMessage',
    async (data, thunkApi) => {
        try {
            const response = await api.post<Message>({ url: '/message', data });
            data.refetch();
            return response;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);
