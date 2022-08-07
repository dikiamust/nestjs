import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerDto: RegisterDto){
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        registerDto.password = hashedPassword
        registerDto.salt = await bcrypt.genSalt();
        registerDto.roleId = 1

        const user = await this.authService.register(registerDto);
        delete user.password;

        return user;
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const user = await this.authService.login({email: loginDto.email})

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        const comparePassword = await bcrypt.compare(loginDto.password, user.password)

        if (!comparePassword ) {
            throw new BadRequestException('invalid credentials');
        }

        return {
            message: 'Login succesfully!'
        }
        
    }
}
