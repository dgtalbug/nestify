import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from './common/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './common/service';
import { contextMiddleware } from './middlewares';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreModule } from './modules/genre/genre.module';
import { TagModule } from './modules/tag/tag.module';
import { PodcastModule } from './modules/podcast/podcast.module';
import { AlbumModule } from './modules/album/album.module';
import { SongModule } from './modules/song/song.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    GenreModule,
    TagModule,
    PodcastModule,
    AlbumModule,
    SongModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
