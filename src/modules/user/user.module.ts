import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserAuthService } from './services/user-auth.service';

@Module({
  imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserRepository]),
    ],
  controllers: [UserController],
    exports: [UserService],
  providers: [UserService, UserAuthService],
})
export class UserModule {}
