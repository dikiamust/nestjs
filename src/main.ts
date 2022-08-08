import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { ResponseFilter } from './utils/response/response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  const logger = new Logger('Main');
  app.useGlobalFilters(
    new ResponseFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );
  
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
  .setTitle('Backend NestJs + TypeOrm + PostgreSQL')
  .setDescription('Backend built using NestJs')
  .setVersion('1.0')
  .addTag('NestJs')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('PORT') | 3000;

  await app.listen( port, () => {
    logger.log(
      `Server running on http://localhost:${port}`,
      'NestJs',
    );
  });
}
bootstrap();
