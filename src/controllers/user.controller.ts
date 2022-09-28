import {Body, Controller, Get, Post} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {CreateUserDto} from "../dto/users/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "../models/user.model";

@Controller('/api')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({type: User, status: 200})
    @Get('/user')
    getUsers() {
        return this.userService.getAllUser();
    }

    @ApiOperation({summary: "Полный список пользователей"})
    @ApiResponse({type: [User], status: 200})
    @Post('/user')
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }
}
