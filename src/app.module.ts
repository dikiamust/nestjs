import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { SendEmailService } from './utils/send-email/send-email.service';
import { LoggerModule } from './utils/logger/logger.module';
import entities from './entities';
import { LoggerService } from './utils/logger/logger.service';
import { ResponseModule } from './utils/response/response.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),   
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature(entities),
    WinstonModule.forRootAsync({
      inject: [LoggerService],
      imports: [LoggerModule],
      useFactory: (loggerService: LoggerService) =>
        loggerService.createLogger(),
    }),
    ProductModule, 
    OrderModule,
    UserModule,
    RoleModule,
    AuthModule,
    LoggerModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [SendEmailService],
})
export class AppModule {}
