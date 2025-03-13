import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './task.controller';
import { TasksMiddleware } from './middleware/tasks/tasks.middleware';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers:[TaskController],
  providers: [TasksService,{
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },]
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TasksMiddleware).forRoutes("tasks")

    //se puede poner solo para una ruta ejemplo
   /*  consumer.apply(TasksMiddleware).forRoutes( 
      {path:"/task/:id",method:RequestMethod.POST}
    )  */
  }
}
