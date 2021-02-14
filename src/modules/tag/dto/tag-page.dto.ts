import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from 'src/common/dto';
import { TagDto } from './tag.dto';

export class TagPageDto {
  @ApiProperty({
    type: TagDto,
    isArray: true,
  })
  readonly data: TagDto[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: TagDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
