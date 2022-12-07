import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'shared/api/axiosRtk';
import { Theme } from 'entities/Theme';
import { FilterTypes } from '@common';

export const api = createApi({
    reducerPath: 'themeApi',
    baseQuery: axiosBaseQuery(),
    endpoints(build) {
        return {
            getThemes: build.query<{ themes: Theme[], pages: number }, FilterTypes>({
                query: (filter: FilterTypes) => ({ url: '/theme', method: 'get', params: { filter } }),
            }),
            getThemeById: build.query< Theme, number>({
                query: (id: number) => ({ url: `/theme/${id}`, method: 'get' }),
            }),
        };
    },

});

export const { useGetThemesQuery, useGetThemeByIdQuery } = api;
