import { Injectable } from '@nestjs/common';
import {User} from "../models/user.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "../dto/users/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {};

    async createUser(dto: CreateUserDto ) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUser() {
        const users = await this.userRepository.findAll();
        return users;
    }

}
