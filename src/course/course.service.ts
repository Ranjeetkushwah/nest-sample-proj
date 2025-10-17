import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { Model } from 'mongoose';


@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

  async create(createCourseDto: CreateCourseDto) {
   return await this.courseModel.create(
      {
        name: createCourseDto.name,
        description: createCourseDto.description,
        price: createCourseDto.price,
        level: createCourseDto.level,
      }
    );
  }

  findAll() {
    return `This action returns all course`;
  }

  async findOne(id: string) {
    return await this.courseModel.findById({_id:id});
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
