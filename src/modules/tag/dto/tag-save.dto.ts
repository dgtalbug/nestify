'use strict';

import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class TagSaveDto {
    @IsString()
    @IsNotEmpty({
        message: 'Name should not be left empty'
    })
    @ApiProperty()
    readonly name: string;

}
