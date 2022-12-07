import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { Message } from '../messages/message.model';

export interface ThemeCreationAttributes {
    name: string;
    authorId: number;
    createdAt: Date;
}

@Table({ tableName: 'theme' })
export class Theme extends Model<Theme, ThemeCreationAttributes> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Крутой фильм', description: 'Название темы' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({
        example: new Date(),
        description: 'Дата создания темы',
    })
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt: Date;

    @ApiProperty({
        example: 1,
        description: 'id автора темы',
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Message)
    messages: Message[];
}
