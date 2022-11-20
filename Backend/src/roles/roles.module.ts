import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRoles]),
        forwardRef(() => AuthModule),
    ],
    exports: [RolesService],
})
export class RolesModule {}
