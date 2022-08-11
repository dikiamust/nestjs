import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class RegisterDto {
    @ApiProperty({ example: 'Admin' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'admin@mail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ example: '12345678' })
    @IsString()
    @IsNotEmpty()
    password: string;
  }
  