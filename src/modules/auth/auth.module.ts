import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import entities from 'src/entities';

@Module({
  imports:[TypeOrmModule.forFeature(entities)],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
