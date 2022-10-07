import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message) private messageRepository: typeof Message,
    ) {}

    async createMessage(dto: CreateMessageDto): Promise<Message> {
        return await this.messageRepository.create({
            ...dto,
            createdAt: new Date(),
        });
    }
}
