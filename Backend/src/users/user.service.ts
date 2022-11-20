import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Roles } from '../auth/types/types';
import { exclude } from './additional/blocked';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue(Roles.USER);
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUser(): Promise<User[]> {
        const users = await this.userRepository.findAll({
            include: { all: true },
            attributes: { exclude },
        });
        return users;
    }

    async getByUserName(userName: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { userName },
            include: { all: true },
        });
        return user;
    }

    async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException(
            'Пользователь или роль не найдены',
            HttpStatus.NOT_FOUND,
        );
    }

    async banUser(dto: BanUserDto): Promise<User> {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.NOT_FOUND,
            );
        }
        user.isBanned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
