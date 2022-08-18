import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';
import { socketInit } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  SwaggerModule.setup('swagger', app, createDocument(app));

  const port = configService.get('PORT') | 3000;

  try {
    const server =  await app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
    socketInit(server);
  } catch (error) {
    throw error; 
  }
}

bootstrap();
