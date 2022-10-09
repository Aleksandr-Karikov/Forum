import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Theme } from './theme.model';
import { MessagesService } from '../messages/messages.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { Message } from '../messages/message.model';
import { User } from '../users/user.model';
import { exclude } from '../users/additional/blocked';

@Injectable()
export class ThemesService {
    constructor(
        @InjectModel(Theme) private themeRepository: typeof Theme,
        private messageService: MessagesService,
    ) {}

    async createTheme(dto: CreateThemeDto): Promise<Theme> {
        const theme = await this.themeRepository.create({
            authorId: dto.authorId,
            name: dto.name,
            createdAt: new Date(),
        });
        const message = await this.messageService.createMessage({
            themeId: theme.id,
            authorId: dto.authorId,
            text: dto.message,
        });
        return theme;
    }

    async getAllThemes(): Promise<Theme[]> {
        return await this.themeRepository.findAll({
            include: {
                model: Message,
                limit: 1,
                separate: true,
                include: [
                    {
                        attributes: { exclude },
                        model: User,
                    },
                ],
            },
        });
    }

    async getThemeById(id: number): Promise<Theme> {
        const theme = await this.themeRepository.findByPk(id, {
            include: {
                model: Message,
                include: [
                    {
                        attributes: { exclude },
                        model: User,
                    },
                ],
            },
        });
        if (!theme)
            throw new HttpException(
                'Такое темы не существует',
                HttpStatus.NOT_FOUND,
            );
        return theme;
    }
}
