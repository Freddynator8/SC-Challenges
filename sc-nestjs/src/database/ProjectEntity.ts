import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './TaskEntity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdDate: string;

  @OneToMany((type) => TaskEntity, (task) => task.pid)
  tasks: TaskEntity[];
}
