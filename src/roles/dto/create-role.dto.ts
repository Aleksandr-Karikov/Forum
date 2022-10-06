import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
    readonly value: string;

    @ApiProperty({
        example: 'Администратор платформы',
        description: 'Описание роли',
    })
    readonly description: string;
}
