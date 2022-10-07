import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { ROLES } from '../auth/roles-auth.decorator';
import { Roles } from '../auth/types/types';
import { AuthGuard } from '../auth/roles.guard';

@ApiTags('Роли')
@ApiBearerAuth()
@Controller('/api')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Получение роли по имени' })
    @ApiResponse({ type: Role, status: 200 })
    @Get('/role/:value')
    @ROLES(Roles.ADMIN)
    @UseGuards(AuthGuard)
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Создать роль' })
    @ApiResponse({ type: Role, status: 200 })
    @Post('/role')
    @ROLES(Roles.ADMIN)
    @UseGuards(AuthGuard)
    createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(roleDto);
    }
}
