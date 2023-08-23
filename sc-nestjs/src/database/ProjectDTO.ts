import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TaskEntity } from './TaskEntity';

export class ProjectDTO {
  @IsInt()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  createdDate: string;

  @IsArray()
  task: TaskEntity[];
}
