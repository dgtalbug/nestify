import { Injectable } from '@nestjs/common';
import { CreateFailedException } from 'src/exceptions/create-failed-exceptions';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRegisterDto } from '../../auth/dto';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
        private readonly userRepository: UserRepository,
  ) {}
  
  @Transactional()
  public async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    try {
      const userData = this.userRepository.create(userRegisterDto);
      let user = await this.userRepository.save(userData);
      return user;
    } catch (error) {
      throw new CreateFailedException(error);
    }
  }

   findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
  
}
