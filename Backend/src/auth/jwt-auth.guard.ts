import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private JwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const headers = req.headers.authorization;
            const [bearer, token] = headers.split(' ');
            if (bearer !== 'Bearer' || !token)
                throw new UnauthorizedException('Пользователь не авторизован');
            const user = this.JwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException('Пользователь не авторизован');
        }
    }
}
