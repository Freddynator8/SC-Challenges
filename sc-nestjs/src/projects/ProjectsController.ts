import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../authentication/LocalAuthGuard';
import { ProjectsService } from './ProjectsService';
import { ProjectDTO } from '../database/ProjectDTO';
import { TaskDTO } from '../database/TaskDTO';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  async allProjects() {
    return this.projectsService.getAllProjects();
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async creatNewProject(@Body() project: ProjectDTO) {
    return this.projectsService.createNewProject(project);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':pid')
  async updateProject(@Param() params: any, @Body() project: ProjectDTO) {
    return this.projectsService.updateProject(params.pid, project);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':pid')
  async deleteProject(@Param() params: any) {
    return this.projectsService.deleteProject(params.pid);
  }

  @UseGuards(LocalAuthGuard)
  @Get(':pid/tasks/')
  async allTasks(@Param() params: any) {
    return this.projectsService.getAllTasks(params.pid);
  }

  @UseGuards(LocalAuthGuard)
  @Post(':pid/tasks/')
  async creatNewTask(@Param() params: any, @Body() task: TaskDTO) {
    return this.projectsService.createNewTask(params.pid, task);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':pid/tasks/:tid')
  async updateTask(@Param('pid') pid: any, @Param('tid') tid: any) {
    return this.projectsService.updateTask(pid, tid);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':pid/tasks/:tid')
  async deleteTask(@Param('pid') pid: any, @Param('tid') tid: any) {
    return this.projectsService.deleteTask(pid, tid);
  }
}
