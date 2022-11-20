import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.model';
import { UserRoles } from '../roles/user-roles.model';
import { Theme } from '../themes/theme.model';
import { Message } from '../messages/message.model';

interface UserCreationAttributes {
    password: string;
    userName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'qwerty12', description: 'Имя пользователя' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    userName: string;

    @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: false, description: 'Забанен ли пользователь' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @ApiProperty({
        example: 'Нарушение правил форума',
        description: 'Причина блокировки аккаунта',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Theme)
    themes: Theme[];

    @HasMany(() => Message)
    messages: Message[];
}
