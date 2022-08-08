import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from 'src/entities';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        const user = new User();
        user.name = registerDto.name;
        user.email = registerDto.email;
        user.password = registerDto.password;
        user.salt = registerDto.salt
        user.roleId = registerDto.roleId

        return this.userRepository.save(user);
    }

    async login(loginDto: any): Promise<User> {
        return this.userRepository.findOne({where: {email: loginDto.email}})
    }
}
