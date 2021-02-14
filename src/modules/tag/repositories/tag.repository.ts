import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { TagEntity } from '../entities/tag.entity';

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {}
