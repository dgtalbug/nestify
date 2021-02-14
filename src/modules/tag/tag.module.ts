import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './controllers/tag.controller';
import { TagRepository } from './repositories/tag.repository';
import { TagService } from './services/tag.service';

@Module({
  imports: [
        TypeOrmModule.forFeature([TagRepository]),
    ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
