import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './repositories';
import { UserController } from './controllers/';
import { UserService } from './services/';
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
