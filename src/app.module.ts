import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { EducationsModule } from './educations/educations.module';

@Module({
  imports: [TasksModule, UserModule, CategoriesModule, AuthModule, EducationsModule],
  
})
export class AppModule {}
