import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ThemesModule } from './themes/themes.module';
import { Theme } from './themes/theme.model';
import { Message } from './messages/message.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Theme, Message],
            autoLoadModels: true,
            timezone: '+00:00',
            define: {
                timestamps: false,
            },
        }),
        UserModule,
        RolesModule,
        AuthModule,
        MessagesModule,
        ThemesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
