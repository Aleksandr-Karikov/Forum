import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.model';
import { AuthResult } from './types/types';

const SALT = 6;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(userDto: CreateUserDto): Promise<AuthResult> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(
        userDto: CreateUserDto,
    ): ReturnType<typeof this.generateToken> {
        const candidate = await this.userService.getByUserName(
            userDto.username,
        );
        if (candidate) {
            throw new HttpException(
                'Имя пользователя занято',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashPassword = await bcrypt.hash(userDto.password, SALT);

        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });

        return this.generateToken(user);
    }

    private async generateToken(user: User): Promise<AuthResult> {
        const payload = {
            username: user.username,
            id: user.id,
            roles: user.roles,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: CreateUserDto): Promise<User> {
        const user = await this.userService.getByUserName(userDto.username);
        const passwordAreEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (user && passwordAreEquals) return user;
        throw new UnauthorizedException({
            message: 'Некорректное имя пользователя или пароль',
        });
    }
}
