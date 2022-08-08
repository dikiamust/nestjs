import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/entities';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';


@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule {}
