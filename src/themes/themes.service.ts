import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Theme } from './theme.model';
import { MessagesService } from '../messages/messages.service';
import { CreateThemeDto } from './dto/create-theme.dto';

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
}
