import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './theme.model';
import { User } from '../users/user.model';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
import { Message } from '../messages/message.model';

@Module({
    providers: [ThemesService],
    controllers: [ThemesController],
    imports: [
        SequelizeModule.forFeature([Theme, User, Message]),
        MessagesModule,
        AuthModule,
    ],
})
export class ThemesModule {}
