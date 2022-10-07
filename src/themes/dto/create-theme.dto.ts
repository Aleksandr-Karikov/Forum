import { ApiProperty } from '@nestjs/swagger';

export class CreateThemeDto {
    readonly authorId: number;

    @ApiProperty({
        example: 'Как выбрать машину',
        description: 'Имя темы',
    })
    readonly name: string;

    @ApiProperty({
        example:
            'Чтобы выбрать машину нужно отталкиваться от ваших потребностей',
        description: 'Первое сообщение в теме',
    })
    readonly message: string;
}
