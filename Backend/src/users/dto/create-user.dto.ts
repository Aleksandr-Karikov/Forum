import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Должно быть стракой' })
    @ApiProperty({ example: 'qwerty123', description: 'имя пользователя' })
    readonly userName: string;

    @IsString({ message: 'Должно быть строкой' })
    @Length(6, 16, { message: 'Пароль должен содержать от 6 до 16 сиволов' })
    @ApiProperty({ example: 'qwertyPassword', description: 'имя пользователя' })
    readonly password: string;
}
