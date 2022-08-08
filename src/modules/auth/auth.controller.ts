import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
        ){}

    @Post('register')
    async register(@Body() registerDto: RegisterDto){
        const user = await this.authService.register(registerDto);
        return user;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        try {
            const user = await this.authService.login(loginDto)
            return {
                message: 'Login succesfully!',
                data: user
            }
        } catch (error) {
            return error;
        }
    }
}
