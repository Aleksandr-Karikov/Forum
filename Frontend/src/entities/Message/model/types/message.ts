import { User } from 'entities/User';
import { Theme } from 'entities/Theme';

export interface Message {
    text: string;
    createdAt: string;
    author: User;
    theme: Theme;
}
