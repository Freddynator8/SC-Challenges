import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TaskDTO {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  createdDate: string;
}
