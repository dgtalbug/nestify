import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';
import { GenreDto } from '../dto/genre.dto';

@Entity({ name: 'genres' })
export class GenreEntity extends AbstractEntity<GenreDto> {
    @Column({ unique: true})
    name: string;

    dtoClass = GenreDto;
}
