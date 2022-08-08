import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registerDto: RegisterDto){
        try {
            const user = await this.authService.register(registerDto);
            return {
                message: 'Register succesfully!',
                data: user
            };
        } catch (error) {
            return error;     
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto){
        try {
            const user = await this.authService.login(loginDto);
            return {
                message: 'Login succesfully!',
                data: user
            };
        } catch (error) {
            return error;
        }
    }
}
