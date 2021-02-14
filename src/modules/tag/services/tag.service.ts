import { Injectable } from '@nestjs/common';
import { PageMetaDto } from 'src/common/dto';
import { CreateFailedException } from 'src/exceptions/create-failed-exceptions';
import { UpdateFailedException } from 'src/exceptions/update-failed-exception';
import { TagPageOptionsDto } from '../dto/tag-page-options.dto';
import { TagPageDto } from '../dto/tag-page.dto';
import { TagSaveDto } from '../dto/tag-save.dto';
import { TagEntity } from '../entities/tag.entity';
import { TagRepository } from '../repositories/tag.repository';
import { DeleteFailedException } from '../../../exceptions/delete-failed-exception';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository : TagRepository
    ){}
    
    async getTags(pageOptionsDto: TagPageOptionsDto): Promise<TagPageDto> {
      const tags = await this.tagRepository.find({skip:pageOptionsDto.skip, take: pageOptionsDto.take});
      
      const pageMetaDto = new PageMetaDto({
        pageOptionsDto,
        itemCount: tags.length,
      });
      return new TagPageDto(tags.toDtos(), pageMetaDto);
    }
    
    async create(TagDto: TagSaveDto): Promise<TagEntity>{
      try {
        const tagData = this.tagRepository.create(TagDto);
        let tag = await this.tagRepository.save(tagData);
        return tag;
      } catch (error) {
        throw new CreateFailedException(error);
      }
    }

    async update(id: string, TagDto:TagSaveDto): Promise<TagEntity>{
      try{
        const tag= await this.tagRepository.update(id,{name: TagDto.name});
        return await this.tagRepository.findOne({id});
      }catch(error){
        throw new UpdateFailedException(error);
      }
    }

    async delete(id:string): Promise<void>{
      try{
        await this.tagRepository.delete({id});
        return;
      }catch(error){
        throw new DeleteFailedException(error);
      }
    }
  }
  