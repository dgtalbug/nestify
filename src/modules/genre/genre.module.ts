import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './controllers/genre.controller';
import { GenreRepository } from './repositories/genre.repository';
import { GenreService } from './services/genre.service';

@Module({
  imports: [
        TypeOrmModule.forFeature([GenreRepository]),
    ],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
