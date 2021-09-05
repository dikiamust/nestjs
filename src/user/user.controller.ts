import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequest } from './request/create-user.request';

@Controller('user')
export class UserController {
  @Get()
  get(): string {
    return 'User';
  }

  @Get('/:id')
  test(@Param() params): string {
    return `Detail user with id: ${params.id}`;
  }

  @Post()
  save(@Body() createUserRequest: CreateUserRequest): string {
    return `${createUserRequest.name}, ${createUserRequest.address}`;
  }
}
