import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import * as Process from 'process';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: Process.env.PRIVATE_KEY || 'SECRET_KEY',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [AuthModule, JwtModule],
})
export class AuthModule {}
