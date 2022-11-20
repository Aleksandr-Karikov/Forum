import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../../auth/types/types';

export class AddRoleDto {
    @ApiProperty({ example: 'ADMIN', description: 'Роль' })
    readonly value: Roles;

    @ApiProperty({ example: 'qwertyPassword', description: 'имя пользователя' })
    readonly userId: number;
}
