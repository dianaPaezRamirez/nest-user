import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';



@Module({
  imports: [TasksModule, UserModule, CategoriesModule],
  
})
export class AppModule {}
