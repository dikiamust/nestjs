import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import entities from 'src/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: configService.get<string>('JWT_EXPIRE')}
      }),
      inject: [ConfigService],
    }),
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

