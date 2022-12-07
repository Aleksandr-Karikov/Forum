import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ThemesService } from './themes.service';
import { Theme } from './theme.model';
import { User } from '../users/user.model';
import { CurrentUserDecorator } from '../auth/current-user.decorator';
import { AuthGuard } from '../auth/roles.guard';
import { ROLES } from '../auth/roles-auth.decorator';
import { Roles } from '../auth/types/types';
import { CreateThemeDto } from './dto/create-theme.dto';
import { FilterTypes } from '@common';

@ApiTags('Темы')
@ApiBearerAuth()
@Controller('/api')
export class ThemesController {
    constructor(private themeService: ThemesService) {}

    @ApiOperation({ summary: 'Создание темы' })
    @ApiResponse({ type: Theme, status: 200 })
    @Post('/theme')
    @ROLES(Roles.USER)
    @UseGuards(AuthGuard)
    createTheme(
        @CurrentUserDecorator() currentUser: User | null,
        @Body() dto: CreateThemeDto,
    ): Promise<Theme> {
        return this.themeService.createTheme({
            ...dto,
            authorId: currentUser.id,
        });
    }

    @ApiOperation({ summary: 'Получить все темы с последним сообщением в них' })
    @ApiResponse({ type: Theme, status: 200 })
    @Get('/theme')
    async getAllThemes(@Query('filter') filter: FilterTypes): Promise<{
        themes: Theme[];
        pages: number;
    }> {
        const themes = await this.themeService.getAllThemes(filter);
        const pages = await this.themeService.getPageCount(filter);
        return { themes, pages };
    }

    @ApiOperation({
        summary: 'Получить тему по id',
    })
    @ApiResponse({ type: Theme, status: 200 })
    @Get('/theme/:id')
    @ROLES(Roles.USER)
    @UseGuards(AuthGuard)
    getTheme(@Param('id') id: number): Promise<Theme> {
        return this.themeService.getThemeById(id);
    }
}
