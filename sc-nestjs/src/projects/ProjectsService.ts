import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../database/ProjectEntity';
import { Repository } from 'typeorm';
import { TaskEntity } from '../database/TaskEntity';
import { ProjectDTO } from '../database/ProjectDTO';
import { TaskDTO } from '../database/TaskDTO';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async getAllProjects(): Promise<any> {
    return this.projectsRepository.find();
  }

  async createNewProject(project: ProjectDTO): Promise<any> {
    const newProject = await this.projectsRepository.create(project);
    await this.projectsRepository.save(newProject);
    return newProject;
  }

  async updateProject(pid: number, project: ProjectDTO): Promise<any> {
    const projectEntity = new ProjectEntity();
    projectEntity.id = project.id;
    projectEntity.name = project.name;
    projectEntity.description = project.description;
    projectEntity.createdDate = project.createdDate;
    await this.projectsRepository.update(pid, projectEntity);
    return true;
  }
  async deleteProject(pid: number): Promise<any> {
    return this.projectsRepository.delete(pid);
  }
  async getAllTasks(pid: number): Promise<any> {
    return this.tasksRepository.find({ where: { pid: pid } });
  }
  async createNewTask(pid: number, task: TaskDTO): Promise<any> {
    const newTask = await this.tasksRepository.create({
      pid: pid,
      name: task.name,
      description: task.description,
      createdDate: task.createdDate,
    });
    this.eventEmitter.emit('task.created', newTask);
    await this.tasksRepository.save(newTask);
    return newTask;
  }
  async updateTask(pid: number, tid: number, task: TaskDTO): Promise<any> {
    const taskEntity = new TaskEntity();
    taskEntity.id = task.id;
    taskEntity.pid = pid;
    taskEntity.name = task.name;
    taskEntity.description = task.description;
    taskEntity.createdDate = task.createdDate;
    await this.projectsRepository.update(tid, taskEntity);
    return taskEntity;
  }
  async deleteTask(pid: number, tid: number): Promise<any> {
    const delRes = this.projectsRepository.delete(tid);
    this.eventEmitter.emit('task.deleted', delRes);
    return delRes;
  }
}
