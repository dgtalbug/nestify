import { Injectable } from '@nestjs/common';
import { CreateFailedException } from 'src/exceptions/create-failed-exceptions';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRegisterDto } from '../../auth/dto';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';
import { UsersPageOptionsDto } from '../dto/users-page-options.dto';
import { UsersPageDto } from '../dto/users-page.dto';
import { PageMetaDto } from 'src/common/dto';

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

  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
        // const queryBuilder = this.userRepository.createQueryBuilder('user');
        // const [users, usersCount] = await queryBuilder
        //     .skip(pageOptionsDto.skip)
        //     .take(pageOptionsDto.take)
        //     .getManyAndCount();

        const users = await this.userRepository.find({skip:pageOptionsDto.skip, take: pageOptionsDto.take});

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: users.length,
        });
        return new UsersPageDto(users.toDtos(), pageMetaDto);
    }
  
}
