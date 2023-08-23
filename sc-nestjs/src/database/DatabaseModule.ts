import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './ProjectEntity';
import { TaskEntity } from './TaskEntity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'nestjs',
      entities: [ProjectEntity, TaskEntity],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
