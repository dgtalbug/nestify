import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from 'src/common/dto';
import { GenreDto } from './genre.dto';

export class GenrePageDto {
  @ApiProperty({
    type: GenreDto,
    isArray: true,
  })
  readonly data: GenreDto[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: GenreDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
