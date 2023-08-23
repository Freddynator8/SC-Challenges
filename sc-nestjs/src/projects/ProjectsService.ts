import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../database/ProjectEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../database/TaskEntity';
import { ProjectDTO } from '../database/ProjectDTO';
import { TaskDTO } from '../database/TaskDTO';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}
  async getAllProjects(): Promise<any> {
    return null;
  }

  async createNewProject(body: any): Promise<any> {
    return null;
  }

  async updateProject(pid: number, project: ProjectDTO): Promise<any> {
    return null;
  }
  async deleteProject(pid: number): Promise<any> {
    return null;
  }
  async getAllTasks(pid: number): Promise<any> {
    return null;
  }
  async createNewTask(pid: number, task: TaskDTO): Promise<any> {
    return null;
  }
  async updateTask(pid: number, tid: number): Promise<any> {
    return null;
  }
  async deleteTask(pid: number, tid: number): Promise<any> {
    return null;
  }
}
