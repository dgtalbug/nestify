'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto';
import { GenreEntity } from '../entities/genre.entity';

export class GenreDto extends AbstractDto {
    @ApiPropertyOptional()
    name: string;

    constructor(genre: GenreEntity) {
        super(genre);
        this.name = genre.name
    }
}
