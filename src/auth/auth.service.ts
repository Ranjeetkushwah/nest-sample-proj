import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async registerUser(registerUserDto: RegisterDto) {
    console.log('registerDto', registerUserDto);
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    //login of user registration
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const token = await this.jwtService.signAsync({ sub: user._id, role: "admin" });
    console.log('Created token:', token);
    return { access_token: token };
  }
}
