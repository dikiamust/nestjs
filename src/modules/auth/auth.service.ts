import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(registerDto.password, 12);
            registerDto.salt = await bcrypt.genSalt();
            registerDto.roleId = 1

            const user = new User();
            user.name = registerDto.name;
            user.email = registerDto.email;
            user.password = hashedPassword;
            user.salt = registerDto.salt
            user.roleId = registerDto.roleId

            const createUser = await this.userRepository.save(user);
            delete createUser.password;

            return createUser;
        } catch (error) {
            throw error
        }
    }

    async login(loginDto: any): Promise<User> {
        return this.userRepository.findOne({where: {email: loginDto.email}})
    }
}
