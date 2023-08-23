import { ProjectsService } from './ProjectsService';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProjectDTO } from '../database/ProjectDTO';
import { ProjectEntity } from '../database/ProjectEntity';
import { TaskEntity } from '../database/TaskEntity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

class RepositoryMock<T> {
  private readonly data: T[] = [];

  find() {
    return this.data;
  }

  create(entity: any) {
    this.data.push(entity);
    return entity;
  }
  save(entity: any) {
    return;
  }
  delete(id: number) {
    for (let index = 0; index < this.data.length; index++) {
      if ((<ProjectEntity>this.data[index]).id == id) {
        this.data.splice(index, 1);
        return;
      }
    }
    return;
  }
}
class EventEmitter2Mock {
  emit() {}
}
describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let projectsRepository: RepositoryMock<ProjectEntity>;
  let tasksRepository: RepositoryMock<TaskEntity>;
  let eventEmitter: EventEmitter2Mock;

  beforeEach(async () => {
    projectsRepository = new RepositoryMock<ProjectEntity>();
    tasksRepository = new RepositoryMock<TaskEntity>();
    eventEmitter = new EventEmitter2Mock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: projectsRepository,
        },
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: tasksRepository,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitter,
        },
      ],
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
  });
  describe('service test', () => {
    it('should be defined', () => {
      expect(projectsService).toBeDefined();
    });
  });

  describe('createNewProject', () => {
    it('should create a new project', async () => {
      const projectDTO: ProjectDTO = {
        id: 0,
        name: 'Test Project',
        description: 'Test Description',
        createdDate: ' Test Date',
      };
      const createdProject = await projectsService.createNewProject(projectDTO);

      expect(projectsRepository.find()).toEqual([createdProject]);
    });
  });

  describe('getAllProjects', () => {
    it('should show all given projects', async () => {
      const projectDTO: ProjectDTO = {
        id: 0,
        name: 'Test Project',
        description: 'Test Description',
        createdDate: ' Test Date',
      };
      await projectsService.createNewProject(projectDTO);
      const getAllProjects = await projectsService.getAllProjects();

      expect(projectsRepository.find()).toEqual(getAllProjects);
    });
  });

  describe('deleteProject', () => {
    it('should delete an existing project', async () => {
      const projectDTO: ProjectDTO = {
        id: 0,
        name: 'Test Project',
        description: 'Test Description',
        createdDate: ' Test Date',
      };
      const createdProject = await projectsService.createNewProject(projectDTO);
      await projectsService.deleteProject(createdProject.id);

      expect(projectsRepository.find()).toEqual([]);
    });
  });
});
