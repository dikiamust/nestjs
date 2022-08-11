import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from 'src/database/entities';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async create(createRoleDto: CreateRoleDto): Promise<Role>{
        try {
            const role = new Role()
            role.name = createRoleDto.name;

            const createRole = await this.roleRepository.save(role);
            return createRole;
        } catch (error) {
            if (error.driverError) throw new BadRequestException(error.driverError.detail);
            throw error;
        }
    }
}
