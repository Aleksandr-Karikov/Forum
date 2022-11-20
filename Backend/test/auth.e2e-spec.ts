import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { RolesModule } from '../src/roles/roles.module';
import { UserModule } from '../src/users/user.module';
import { getModelToken } from '@nestjs/sequelize';
import { Role } from '../src/roles/role.model';
import { UserRoles } from '../src/roles/user-roles.model';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    const mockRoleRepository = {};
    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AuthModule],
            providers: [UserModule],
        })
            // .overrideProvider(getModelToken(UserRoles))
            // .useValue(mockRoleRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ register', () => {
        return request(app.getHttpServer())
            .post('/api/registration')
            .expect(201);
    });
});
