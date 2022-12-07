import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';
import { ROLES } from '../auth/roles-auth.decorator';
import { AuthGuard } from '../auth/roles.guard';
import { Roles } from '../auth/types/types';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CurrentUserDecorator } from 'auth/current-user.decorator';

@ApiTags('Позьзователи')
@ApiBearerAuth()
@Controller('/api')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Текущий авторизованный пользователь' })
    @ApiResponse({ type: User, status: 200 })
    @Get('/user')
    @ROLES(Roles.USER, Roles.ADMIN)
    @UseGuards(AuthGuard)
    getCurrentUser(@CurrentUserDecorator() currentUser: User | null): User {
        return currentUser;
    }

    @ApiOperation({ summary: 'Полный список пользователей' })
    @ApiResponse({ type: User, status: 200 })
    @Get('/users')
    @ROLES(Roles.USER)
    @UseGuards(AuthGuard)
    getUsers(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ type: [User], status: 200 })
    @Post('/user')
    @ROLES(Roles.ADMIN)
    @UseGuards(AuthGuard)
    createUser(@Body() userDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @Post('/user/role')
    @ROLES(Roles.ADMIN)
    @UseGuards(AuthGuard)
    addRole(@Body() dto: AddRoleDto): Promise<AddRoleDto> {
        return this.userService.addRole(dto);
    }

    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/user/ban')
    @ROLES(Roles.ADMIN)
    @UseGuards(AuthGuard)
    banUser(@Body() dto: BanUserDto): Promise<User> {
        return this.userService.banUser(dto);
    }
}
