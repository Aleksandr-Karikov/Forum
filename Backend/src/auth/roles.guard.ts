import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private JwtService: JwtService, private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(
                ROLES_KEY,
                [context.getHandler(), context.getClass()],
            );
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const headers = req.headers.authorization;
            const [bearer, token] = headers.split(' ');
            if (bearer !== 'Bearer' || !token)
                throw new UnauthorizedException('Пользователь не авторизован');
            const user = this.JwtService.verify(token);
            req.user = user;
            return user.roles.some((role) =>
                requiredRoles.includes(role.value),
            );
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
