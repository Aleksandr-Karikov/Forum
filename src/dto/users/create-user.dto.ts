import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: "qwerty123", description:'имя пользователя'})
    readonly userName: string;

    @ApiProperty({example: "qwertyPassword", description:'имя пользователя'})
    readonly password: string;
}