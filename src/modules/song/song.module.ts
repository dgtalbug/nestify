import { Module } from '@nestjs/common';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';

@Module({
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
