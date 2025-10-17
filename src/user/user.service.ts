import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(registerUserDto: RegisterDto): Promise<User> {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      console.error('Error creating user:', error);
      const err = error as { code?: number };
      const DUPLICATE_KEY_CODE = 11000;
      if (err.code == DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }

    // const user = new this.userModel({ registerUserDto });
    // return user.save();
  }

  async getUserById(id: string) {
    return this.userModel.findById({ _id: id });
  }
}
