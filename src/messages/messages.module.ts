import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.model';
import { AuthModule } from '../auth/auth.module';
import { Theme } from '../themes/theme.model';
import { User } from '../users/user.model';

@Module({
    providers: [MessagesService],
    controllers: [MessagesController],
    imports: [SequelizeModule.forFeature([Message, User, Theme]), AuthModule],
    exports: [MessagesService],
})
export class MessagesModule {}
