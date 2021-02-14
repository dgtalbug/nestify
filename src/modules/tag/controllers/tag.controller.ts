import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RoleType } from 'src/common/constants';
import { Roles } from 'src/decorators';
import { AuthGuard, RolesGuard } from 'src/guards';
import { AuthUserInterceptor } from 'src/interceptors';
import { TagPageOptionsDto } from '../dto/tag-page-options.dto';
import { TagPageDto } from '../dto/tag-page.dto';
import { TagSaveDto } from '../dto/tag-save.dto';
import { TagDto } from '../dto/tag.dto';
import { TagService } from '../services/tag.service';

@Controller('tag')
@ApiTags('Tags')
@UseGuards(AuthGuard,RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class TagController {
   constructor(
    private readonly tagService : TagService
  ){}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Tags',
    type: TagPageDto,
  })
  async getTags (@Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: TagPageOptionsDto,): Promise<TagPageDto>{
      return this.tagService.getTags(pageOptionsDto);
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status:HttpStatus.OK,
    description: 'New Tag Saved',
    type: TagDto,
  })
  @Roles(RoleType.SINGER)
  async create(@Body() tagDto : TagSaveDto): Promise<TagDto>{
    const tag =  await this.tagService.create(tagDto);
    return tag.toDto();
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tag Updated',
    type: TagDto,
  })
  @Roles(RoleType.SINGER)
  async update(@Param('id') id:string, @Body() tagDto : TagSaveDto): Promise<TagDto>{
    const tag = await this.tagService.update(id,tagDto);
    return tag.toDto();
  }
  
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
   status: HttpStatus.NO_CONTENT,
    description: 'Tag Deleted',
  })
  @Roles(RoleType.SINGER)
  async delete(@Param('id') id:string):Promise<void>{
    return await this.tagService.delete(id);
  }
}
