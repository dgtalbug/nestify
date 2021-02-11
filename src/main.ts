import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as RateLimit from 'express-rate-limit';
import { ConfigService, LogService, SwaggerService } from './common/service';
import { CommonModule } from './common/modules';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  const configService = app.select(CommonModule).get(ConfigService);
  const logger = app.select(CommonModule).get(LogService);
  const documentation = SwaggerService;
  const port = configService.getNumber('PORT');
  const reflector = app.get(Reflector);

  app.use(helmet());

  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(morgan('combined'));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false,
      },
    }),
  );
  app.useLogger(logger);
  documentation(app);
  await app.listen(port);
  logger.log(port);
}
bootstrap();
