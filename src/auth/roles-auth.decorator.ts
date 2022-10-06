import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const ROLES = (...roles: string[]): CustomDecorator<string> =>
    SetMetadata(ROLES_KEY, roles);
