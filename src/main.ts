import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.enableCors();
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

  await app.listen(port);
}
bootstrap();
