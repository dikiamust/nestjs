import { Body, Controller, Post, ForbiddenException } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

    @Post('create')
    async create(@Body() createRoleDto: CreateRoleDto){
        try {
            const role = this.roleService.create(createRoleDto);
            return role;
        } catch (error) {
            if (error.driverError) return new ForbiddenException(error.driverError.detail);
            return error; 
        }
    }
}
