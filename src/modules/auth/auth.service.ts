import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { User } from 'src/entities';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(registerDto.password, 12);
            registerDto.salt = await bcrypt.genSalt();
            registerDto.roleId = 1;

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
            if (error.driverError) throw new BadRequestException(error.driverError.detail);
            throw error
        }
    }

    async login(loginDto: LoginDto) {
        try {
            const findUser =  await this.userRepository.findOne({where: {email: loginDto.email}})

            if (!findUser) {
                throw new BadRequestException('Invalid credentials');
            }
    
            const comparePassword = await bcrypt.compare(loginDto.password, findUser.password)
    
            if (!comparePassword) {
                throw new BadRequestException('Invalid credentials');
            }
    
            const jwt = await this.jwtService.signAsync({userId: findUser.id, roleId: findUser.roleId});
    
            const data = { email: findUser.email, token: jwt }

            return data;
        } catch (error) {
            throw error
            
        }
      
    }
}
