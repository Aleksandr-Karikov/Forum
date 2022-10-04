import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";

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
            autoLoadModels:true,
            timezone: "+00:00",
            define: {
                timestamps: false
            }
        }),
        UserModule
    ],
})
export class AppModule {}
