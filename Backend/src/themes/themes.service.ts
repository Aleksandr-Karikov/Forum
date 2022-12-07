import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Theme } from './theme.model';
import { MessagesService } from '../messages/messages.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { Message } from '../messages/message.model';
import { User } from '../users/user.model';
import { exclude } from '../users/additional/blocked';
import { Op } from 'sequelize';
import { FilterTypes } from '@common';

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

    async getAllThemes({
        search = '',
        limit,
        page,
    }: FilterTypes): Promise<Theme[]> {
        return await this.themeRepository.findAll({
            where: {
                name: { [Op.iLike]: `%${search}%` },
            },
            limit,
            offset: page * limit,
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

    async getPageCount({
        search = '',
        limit,
        page,
    }: FilterTypes): Promise<number> {
        const count = await this.themeRepository.count({
            where: {
                name: { [Op.iLike]: `%${search}%` },
            },
        });
        return Math.ceil(count / limit);
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
