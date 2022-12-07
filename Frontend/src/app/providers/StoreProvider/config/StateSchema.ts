import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { RegisterSchema } from 'features/Register/model/types/registerSchema';
import { CreateThemeSchema } from 'features/CreateTheme/model/types/CreateTheme';
import { SendMessageSchema } from 'features/SendMessage/model/types/SendMessage';

export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
    createThemeForm?: CreateThemeSchema;
    sendMessage?:SendMessageSchema;
}
