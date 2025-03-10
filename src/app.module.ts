import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TaskController } from './tasks/task.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [TasksModule, UserModule],
})
export class AppModule {}
