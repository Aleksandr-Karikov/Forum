import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { Theme } from '../themes/theme.model';

interface MessageCreationAttributes {
    text: string;
    themeId: number;
    createdAt: Date;
    authorId: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttributes> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Привет кореш', description: 'Текс сообщения' })
    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @ApiProperty({
        example: new Date(),
        description: 'дата отправки сообщения',
    })
    @Column({ type: DataType.DATE, allowNull: false })
    createdAt;

    @ApiProperty({
        example: 1,
        description: 'id автора сообщения',
    })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number;

    @BelongsTo(() => User)
    author: User;

    @ApiProperty({
        example: 1,
        description: 'id темы в которую было направлено сообщение',
    })
    @ForeignKey(() => Theme)
    @Column({ type: DataType.INTEGER, allowNull: false })
    themeId: number;
    @BelongsTo(() => Theme)
    theme: Theme;
}
