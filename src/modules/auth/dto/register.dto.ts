import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
  export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'john@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ example: '12345' })
    @IsString()
    @IsNotEmpty()
    password: string;

    salt: string;

    roleId: number
  }
  