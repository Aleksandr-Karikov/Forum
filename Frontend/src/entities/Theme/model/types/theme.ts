import { User } from 'entities/User';
import { Message } from 'entities/Message/model/types/message';

export interface Theme {
    id: string;
    name: string;
    createdAt: Date;
    authorId: number;
    author: User;
    messages: Message[];
}
