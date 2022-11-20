import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
    readonly authorId: number;

    @ApiProperty({
        example: 1,
        description: 'id темы куда направлено сообщение',
    })
    readonly themeId: number;

    @ApiProperty({
        example:
            'Чтобы выбрать машину нужно отталкиваться от ваших потребностей',
        description: 'сообщение',
    })
    readonly text: string;
}
