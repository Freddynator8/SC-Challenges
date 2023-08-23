import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskDTO } from '../database/TaskDTO';

@Injectable()
export class EventQueue {
  @OnEvent('task.created')
  handleTaskCreatedEvent(task: TaskDTO) {
    console.log('Task with Name: ' + task.name + ' got created!');
  }
  @OnEvent('task.deleted')
  handleTaskDeletedEvent(task: TaskDTO) {
    console.log('Task with ID: ' + task.id.toString() + ' got deleted!');
  }
}
