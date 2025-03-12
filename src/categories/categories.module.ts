import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthMiddleware } from 'src/auth/middleware/auth/auth.middleware';
import { PrismaService } from 'prisma.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService,PrismaService],
})

export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user');
  }
}
