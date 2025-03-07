import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './task.controller';
import { TasksMiddleware } from './middleware/tasks/tasks.middleware';
import { AuthMiddleware } from 'src/auth/middleware/auth/auth.middleware';

@Module({
  controllers:[TaskController],
  providers: [TasksService]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TasksMiddleware).forRoutes("tasks").apply(AuthMiddleware).forRoutes("tasks")

    //se puede poner solo para una ruta ejemplo
   /*  consumer.apply(TasksMiddleware).forRoutes( 
      {path:"/task/:id",method:RequestMethod.POST}
    )  */
  }
}
