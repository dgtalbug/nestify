import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiNoContentResponse } from '@nestjs/swagger';
import { AuthGuard, RolesGuard } from 'src/guards';
import { AuthUserInterceptor } from 'src/interceptors';
import { GenreService } from '../services/genre.service';
import { GenrePageDto } from '../dto/genre-page.dto';
import { Query } from '@nestjs/common';
import { GenrePageOptionsDto } from '../dto/genre-page-options.dto';
import { GenreDto } from '../dto/genre.dto';
import { GenreSaveDto } from '../dto/genre-save.dto';
import { Roles } from 'src/decorators';
import { RoleType } from 'src/common/constants';

@Controller('genre')
@ApiTags('Genres')
@UseGuards(AuthGuard,RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class GenreController {

  constructor(
    private readonly genreService : GenreService
  ){}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Genres',
    type: GenrePageDto,
  })
  async getGenres( @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: GenrePageOptionsDto,): Promise<GenrePageDto>{
      return this.genreService.getGenres(pageOptionsDto);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status:HttpStatus.OK,
    description: 'New Genre Saved',
    type: GenreDto,
  })
  @Roles(RoleType.SINGER)
  async create(@Body() genreDto : GenreSaveDto): Promise<GenreDto>{
    const genre =  await this.genreService.create(genreDto);
    return genre.toDto();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Genre Updated',
    type: GenreDto,
  })
  @Roles(RoleType.SINGER)
  async update(@Param('id') id:string, @Body() genreDto : GenreSaveDto): Promise<GenreDto>{
    const genre = await this.genreService.update(id,genreDto);
    return genre.toDto();
  }
  
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
   status: HttpStatus.NO_CONTENT,
    description: 'Genre Deleted',
  })
  @Roles(RoleType.SINGER)
  async delete(@Param('id') id:string):Promise<void>{
    return await this.genreService.delete(id);
  }

}
