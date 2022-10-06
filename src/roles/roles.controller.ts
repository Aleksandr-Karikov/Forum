import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Роли')
@Controller('/api')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({ summary: 'Получение роли по имени' })
    @ApiResponse({ type: Role, status: 200 })
    @Get('/role/:value')
    getRoleByValue(@Param('value') value: string): Promise<Role> {
        return this.rolesService.getRoleByValue(value);
    }

    @ApiOperation({ summary: 'Создать роль' })
    @ApiResponse({ type: Role, status: 200 })
    @Post('/role')
    createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
        return this.rolesService.createRole(roleDto);
    }
}
