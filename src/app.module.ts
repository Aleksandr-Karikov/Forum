import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {ConfigModule} from "@nestjs/config";
import {User} from "./models/user.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User],
            autoLoadModels: true,
        }),
        UserModule
    ],
})
export class AppModule {}
