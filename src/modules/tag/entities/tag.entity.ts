import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';
import { TagDto } from '../dto/tag.dto';

@Entity({ name: 'genres' })
export class TagEntity extends AbstractEntity<TagDto> {
    @Column({ unique: true})
    name: string;

    dtoClass = TagDto;
}
