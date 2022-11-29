import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { UserModule } from '../users/user.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from './auth.module';

describe('CatsController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AuthModule],
        })
            .overrideProvider(AuthService)
            .useValue({})
            .overrideProvider(UserModule)
            .useValue({})
            .compile();

        authService = moduleRef.get<AuthService>(AuthService);
        authController = moduleRef.get<AuthController>(AuthController);
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = {
                token: 'test',
            };
            jest.spyOn(authService, 'registration').mockResolvedValue(result);

            expect(
                await authController.registration({
                    username: 'username',
                    password: 'password',
                }),
            ).toBe(result);
        });
    });
});
