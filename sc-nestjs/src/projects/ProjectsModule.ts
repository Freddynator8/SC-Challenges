import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../database/ProjectEntity';
import { TaskEntity } from '../database/TaskEntity';
import { ProjectsController } from './ProjectsController';
import { ProjectsService } from './ProjectsService';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, TaskEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
