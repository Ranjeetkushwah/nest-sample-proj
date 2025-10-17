import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    level: string;
    
    @IsString()
    @IsNotEmpty()
    price: string;
}
