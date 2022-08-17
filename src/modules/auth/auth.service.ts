import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { User } from 'src/database/entities';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '../role/enum/role.enum';
import { sendEmail } from '../../utils'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private config: ConfigService,
        private jwt: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const { name, email, password } = dto;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        try {
        const user = await this.userRepository.save({
            name,
            email,
            password: hashPassword,
            salt,
            roleId: UserRole.ADMIN
        });
        delete user.password

        const mailOptionsToUser = {
            to: user.email,
            from: this.config.get('MAIL_USER'),
            subject: 'Thank You!',
          };
      
        const data = {name: user.name}
        const template = 'src/modules/auth/template/registration.template.html'
        await sendEmail(template, data, mailOptionsToUser) 

        return {
            message: 'Success Sign Up',
            data: user,
        };
        
        } catch (error) {
        if (error.driverError)
            throw new BadRequestException(error.driverError.detail);
        throw error;
        }
    }

    async login(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.userRepository.findOne({
            where: {
              email,
            },
        });

        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ForbiddenException('Invalid credentials');
        }

        //generate jwt token
        const token = await this.signToken(user.id, user.roleId);

        return {
            message: 'Success Sign In',
            token,
        };
    }

    async signToken(id: number, roleId: number): Promise<string> {
        const payload = {
          id,
          roleId,
        };
    
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
          expiresIn: this.config.get('JWT_EXPIRE'),
          secret: secret,
        });
    
        return token;
      }
        
}
