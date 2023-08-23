import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pid: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdDate: string;
}
