import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResult } from './types/types';

@ApiTags('Авторизация')
@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto): Promise<AuthResult> {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'регистрация пользователя' })
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto): Promise<AuthResult> {
        return this.authService.registration(userDto);
    }
}
