import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService){}

    @Post('create')
    async create(@Body() createRoleDto: CreateRoleDto){
        return this.roleService.create(createRoleDto);
    }
}
