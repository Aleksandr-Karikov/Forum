import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { ROLES } from '../auth/roles-auth.decorator';
import { Roles } from '../auth/types/types';
import { AuthGuard } from '../auth/roles.guard';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { CurrentUserDecorator } from '../auth/current-user.decorator';
import { User } from '../users/user.model';

@ApiTags('Сообщения')
@Controller('/api')
@ApiBearerAuth()
export class MessagesController {
    constructor(private messageService: MessagesService) {}

    @ApiOperation({ summary: 'Отправка сообщения' })
    @ApiResponse({ type: Message, status: 200 })
    @Post('/message')
    @ROLES(Roles.USER)
    @UseGuards(AuthGuard)
    createMessage(
        @Body() dto: CreateMessageDto,
        @CurrentUserDecorator() currentUser: User | null,
    ): Promise<Message> {
        return this.messageService.createMessage({
            ...dto,
            authorId: currentUser.id,
        });
    }
}
