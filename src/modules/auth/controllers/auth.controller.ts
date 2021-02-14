import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../user/dto';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginPayloadDto, UserLoginDto, UserRegisterDto } from '../dto';
import { RoleType } from 'src/common/constants';
import { AuthUser, Roles } from 'src/decorators';
import { AuthUserInterceptor } from 'src/interceptors/auth-user.interceptor';
import { AuthGuard, RolesGuard } from 'src/guards';
import { UserEntity } from 'src/modules/user/entities';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
        public readonly userService: UserService,
        public readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ status: HttpStatus.OK, type: UserDto, description: 'Registration Successfull' })
  async register(
      @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
      const user = await this.userService.createUser(
          userRegisterDto,
      );

      return user.toDto();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.createToken(user);

    return new LoginPayloadDto(user.toDto(), token);
  }

  @Patch('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Successfully Logout',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @Roles(RoleType.SINGER, RoleType.LISTENER, RoleType.ROOT)
  async userLogout(): Promise<void> {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity) {
      return user.toDto();
  }
}
