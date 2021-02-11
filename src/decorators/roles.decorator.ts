import { SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/common/constants';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
