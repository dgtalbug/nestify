import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { UserEntity } from 'src/modules/user/entities';
import { UserAuthService, UserService } from 'src/modules/user/services';
import { ContextService, UtilsService } from 'src/providers';
import { TokenPayloadDto, UserLoginDto } from '../dto';
import { UserPasswordNotValidException } from '../../../exceptions/user-password-not-valid.exception';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/common/service';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user_key';

  constructor(
     public readonly jwtService: JwtService,
        public readonly configService: ConfigService,
        public readonly userService: UserService,

  ){}
  public async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const { username, password } = userLoginDto;
    
    let user = await this.userService.findOne({ username });
    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await UtilsService.validateHash(
      password,
      user && user.password,
    );
    if (!isPasswordValid) {
      throw new UserPasswordNotValidException();
    }

    return user;
  }
  
  public async createToken(user: UserEntity): Promise<TokenPayloadDto> {
     return new TokenPayloadDto({
            expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
            accessToken: await this.jwtService.signAsync({ id: user.id }),
        });
  }

   public static setAuthUser(user: UserEntity): void {
    ContextService.set(AuthService._authUserKey, user);
  }
}
