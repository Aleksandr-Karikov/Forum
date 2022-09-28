import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../models/user.model";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([User])
    ]
})
export class UserModule {}
