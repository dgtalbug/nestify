'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto';
import { TagEntity } from '../entities/tag.entity';

export class TagDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    constructor(genre: TagEntity) {
        super(genre);
        this.name = genre.name
    }
}
