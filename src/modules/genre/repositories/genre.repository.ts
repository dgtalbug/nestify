import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { GenreEntity } from '../entities/genre.entity';

@EntityRepository(GenreEntity)
export class GenreRepository extends Repository<GenreEntity> {}
