import { Injectable } from '@nestjs/common';
import { PageMetaDto } from 'src/common/dto';
import { CreateFailedException } from 'src/exceptions/create-failed-exceptions';
import { UpdateFailedException } from 'src/exceptions/update-failed-exception';
import { GenrePageOptionsDto } from '../dto/genre-page-options.dto';
import { GenrePageDto } from '../dto/genre-page.dto';
import { GenreSaveDto } from '../dto/genre-save.dto';
import { GenreEntity } from '../entities/genre.entity';
import { GenreRepository } from '../repositories/genre.repository';
import { DeleteFailedException } from '../../../exceptions/delete-failed-exception';

@Injectable()
export class GenreService {
  constructor(
    private readonly genreRepository : GenreRepository
    ){}
    
    async getGenres(pageOptionsDto: GenrePageOptionsDto): Promise<GenrePageDto> {
      const genres = await this.genreRepository.find({skip:pageOptionsDto.skip, take: pageOptionsDto.take});
      
      const pageMetaDto = new PageMetaDto({
        pageOptionsDto,
        itemCount: genres.length,
      });
      return new GenrePageDto(genres.toDtos(), pageMetaDto);
    }
    
    async create(genreDto: GenreSaveDto): Promise<GenreEntity>{
      try {
        const genreData = this.genreRepository.create(genreDto);
        let genre = await this.genreRepository.save(genreData);
        return genre;
      } catch (error) {
        throw new CreateFailedException(error);
      }
    }

    async update(id: string, genreDto:GenreSaveDto): Promise<GenreEntity>{
      try{
        const genre= await this.genreRepository.update(id,{name: genreDto.name});
        return await this.genreRepository.findOne({id});
      }catch(error){
        throw new UpdateFailedException(error);
      }
    }

    async delete(id:string): Promise<void>{
      try{
        await this.genreRepository.delete({id});
        return;
      }catch(error){
        throw new DeleteFailedException(error);
      }
    }
  }
  