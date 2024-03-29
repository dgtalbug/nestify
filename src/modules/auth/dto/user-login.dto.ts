'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}
