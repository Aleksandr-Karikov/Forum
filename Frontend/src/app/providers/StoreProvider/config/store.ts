import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { registerReducer } from 'features/Register';
import { createThemeReducers } from 'features/CreateTheme';
import { sendMessageReducers } from 'features/SendMessage/model/slice/SendMessageSlice';
import { api } from './api';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers = {
        user: userReducer,
        loginForm: loginReducer,
        registerForm: registerReducer,
        createThemeForm: createThemeReducers,
        sendMessage: sendMessageReducers,
        [api.reducerPath]: api.reducer,
    };
    const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware().concat(api.middleware);

    return configureStore<StateSchema>({
        reducer: rootReducers,
        middleware,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
