import { Body, Controller, HttpCode, HttpStatus, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../user/dto';
import { UserService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginPayloadDto, UserLoginDto, UserRegisterDto } from '../dto';
import { RoleType } from 'src/common/constants';
import { Roles } from 'src/decorators';
import { AuthUserInterceptor } from 'src/interceptors/auth-user.interceptor';
import { AuthGuard, RolesGuard } from 'src/guards';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(
        public readonly _userService: UserService,
        public readonly _authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ status: HttpStatus.OK, type: UserDto, description: 'Registration Successfull' })
  async register(
      @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
      const user = await this._userService.createUser(
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
    const user = await this._authService.validateUser(userLoginDto);
    const token = await this._authService.createToken(user);

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
}
