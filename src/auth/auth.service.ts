import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto: RegisterDto) {
    console.log('registerDto', registerUserDto);
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    //login of user registration
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    console.log('Created User:', user);
    return user;
  }
}
