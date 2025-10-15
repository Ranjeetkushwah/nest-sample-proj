import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async create(@Body() registerUserDto: RegisterDto) {
    // delegate to the service which expects a RegisterDto-like object
    return this.usersService.createUser(registerUserDto);
  }

  //   @Get()
  //   async findAll() {
  //     return this.usersService.findAll();
  //   }
}
