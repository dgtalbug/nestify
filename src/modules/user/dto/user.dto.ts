'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleType } from 'src/common/constants';
import { AbstractDto } from 'src/common/dto';
import { UserEntity } from '../entities';

export class UserDto extends AbstractDto {
    @ApiPropertyOptional()
    username: string;

    @ApiPropertyOptional({ enum: RoleType })
    role: RoleType;

    @ApiPropertyOptional()
    email: string;

    constructor(user: UserEntity) {
        super(user);
        this.username = user.username
        this.role = user.role;
        this.email = user.email;
    }
}
