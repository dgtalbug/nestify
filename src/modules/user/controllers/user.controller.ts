import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleType } from 'src/common/constants';
import { Roles } from 'src/decorators';
import { AuthGuard, RolesGuard } from 'src/guards';
import { AuthUserInterceptor } from '../../../interceptors/auth-user.interceptor';
import { UserService } from '../services/user.service';
import { UsersPageDto } from '../dto/users-page.dto';
import { UsersPageOptionsDto } from '../dto/users-page-options.dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard,RolesGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UserController {

  constructor(
    private readonly userService: UserService
  ){}

  @Get('/')
  @Roles(RoleType.ROOT)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user',
    type: UsersPageDto,
  })
  getUsers(
        @Query(new ValidationPipe({ transform: true }))
        pageOptionsDto: UsersPageOptionsDto,
    ): Promise<UsersPageDto> {
        return this.userService.getUsers(pageOptionsDto);
    }
  
}
