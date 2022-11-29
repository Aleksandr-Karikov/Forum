import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { RegisterSchema } from 'features/Register/model/types/registerSchema';

export interface StateSchema {
    user: UserSchema;
    loginForm?: LoginSchema;
    registerForm?: RegisterSchema;
}
