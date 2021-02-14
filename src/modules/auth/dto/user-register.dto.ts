'use strict';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    Validator,
} from 'class-validator';
import { RoleType } from 'src/common/constants';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty({
        message: 'UserName should not be left empty'
    })
    @ApiProperty()
    readonly userName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: 'Email should not be left empty'
    })
    @ApiProperty()
    readonly email: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ enum: RoleType })
    readonly role: RoleType;

    @IsString()
    @MinLength(6)
    @ApiProperty({ minLength: 6 })
    readonly password: string;
}
