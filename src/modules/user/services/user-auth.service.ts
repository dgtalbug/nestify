import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userRepository : UserRepository
  ){

  }
   findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
}
